const express = require('express');
const dotenv = require('dotenv');
const mongodb = require('./data/database');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoStore = require('connect-mongo');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

// Cargar variables de entorno
dotenv.config();

const baseUrl = process.env.BASE_URL || 'http://localhost:3001';
const port = process.env.PORT || 8080;

// Verificación de variables de entorno
const checkRequiredEnvVars = () => {
    const required = [
        'GITHUB_CLIENT_ID',
        'GITHUB_CLIENT_SECRET',
        'SESSION_SECRET',
        'BASE_URL',
        'MONGODB_URL',
        'JWT_SECRET'
    ];

    const missing = required.filter(key => !process.env[key]);
    if (missing.length > 0) {
        console.error('Faltan las siguientes variables de entorno:', missing);
        process.exit(1);
    }
};

checkRequiredEnvVars();

const app = express();

// Configuración de CORS
const corsOptions = {
    origin: [
        process.env.FRONTEND_URL || 'http://localhost:3000'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
};

app.use(cors(corsOptions));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de sesiones con almacenamiento en MongoDB
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URL,
        collectionName: 'sessions'
    }),
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000, // 24 horas
        httpOnly: true,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    },
    rolling: true
}));

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

// Serialización y deserialización de usuario
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// Configuración de Passport con GitHub
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    scope: ['user:email']
}, async function (accessToken, refreshToken, profile, done) {
    try {
        const user = {
            githubId: profile.id,
            email: profile.emails?.[0]?.value || `${profile.username}@github.com`,
            firstName: profile.displayName || profile.username,
            lastName: '',
            authType: 'github'
        };

        const db = mongodb.getDatabase();
        let existingUser = await db.collection('users').findOne({ githubId: profile.id });

        if (!existingUser) {
            const result = await db.collection('users').insertOne(user);
            existingUser = { ...user, _id: result.insertedId };
        }

        return done(null, existingUser);
    } catch (error) {
        console.error('Error en autenticación GitHub:', error);
        return done(error, null);
    }
}));

// Middleware para prevenir caché
const preventCache = (req, res, next) => {
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
};

app.use('/auth/*', preventCache);
app.use('/api-docs', preventCache);

// Rutas
app.use('/', require('./routes'));

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Manejo de errores mejorado
app.use((err, req, res, next) => {
    console.error('Error detallado:', {
        name: err.name,
        message: err.message,
        stack: err.stack,
        code: err.code
    });

    if (err.name === 'InternalOAuthError') {
        return res.redirect(`${process.env.FRONTEND_URL}?error=github_auth_failed&reason=${encodeURIComponent(err.message)}`);
    }

    res.status(500).json({
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? {
            message: err.message,
            type: err.name,
            stack: err.stack
        } : undefined
    });
});

// Inicializar la base de datos y luego iniciar el servidor
const startServer = async () => {
    try {
        // Esperar a que la base de datos se inicialice
        await new Promise((resolve, reject) => {
            mongodb.initDb((err, db) => {
                if (err) reject(err);
                else resolve(db);
            });
        });

        // Una vez que la base de datos está conectada, iniciar el servidor
        app.listen(port, () => {
            console.log(`✅ Servidor ejecutándose en el puerto ${port}`);
            console.log(`✅ URL base: ${baseUrl}`);
            console.log('✅ Variables de entorno verificadas correctamente');
        });
    } catch (error) {
        console.error('❌ Error al iniciar el servidor:', error);
        process.exit(1);
    }
};

// Iniciar el servidor
startServer();

module.exports = app;