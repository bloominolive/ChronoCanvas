const router = require('express').Router();
const passport = require('passport');
const path = require('path');
const { verifyToken, generateToken } = require('../middleware/auth.js');

// Middleware de logs
const logMiddleware = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
};

router.use(logMiddleware);

// ✅ Ruta principal: Devuelve una página HTML explicativa
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html')); // Sirve la página estática
});


// Rutas públicas (sin autenticación)
router.get('/ldsChurchHistory', require('../controllers/ldsChurchHistory').getAll);
router.get('/ldsChurchHistory/:id', require('../controllers/ldsChurchHistory').getSingle);
router.get('/templeDedications', require('../controllers/templeDedications').getAll);
router.get('/templeDedications/:id', require('../controllers/templeDedications').getSingle);


// ✅ Ruta de autenticación con GitHub
router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

// ✅ Callback de autenticación con GitHub
router.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    async (req, res) => {
        try {
            console.log('Callback de GitHub ejecutado, usuario:', req.user);

            if (!req.user) {
                console.log('No se recibió usuario en callback');
                return res.redirect(`${process.env.FRONTEND_URL}?error=auth_failed`);
            }

            const token = generateToken(req.user);
            req.session.token = token;
            req.session.user = req.user;

            // Si la petición es JSON, responder con los datos
            if (req.headers.accept && req.headers.accept.includes('application/json')) {
                return res.json({
                    success: true,
                    token,
                    user: req.user
                });
            }

            // Redirigir a Swagger
            res.redirect(`${process.env.BASE_URL}/swagger/api-docs`);
        } catch (error) {
            console.error('Error en callback:', error);
            res.redirect(`${process.env.FRONTEND_URL}?error=server_error`);
        }
    }
);

// ✅ Ruta para obtener el token
router.get('/auth/login', verifyToken, (req, res) => {
    if (req.session && req.session.token) {
        res.json({
            token: req.session.token,
            user: req.session.user
        });
    } else {
        res.status(401).json({ message: 'No token available' });
    }
});

// ✅ Ruta de logout (verifica si hay sesión antes de destruirla)
router.get('/auth/logout', (req, res) => {
    if (!req.session) {
        return res.status(400).json({ message: "No hay sesión activa" });
    }
    
    req.session.destroy((err) => {
        if (err) {
            console.error('Error al cerrar sesión:', err);
            return res.status(500).json({ message: "Error al cerrar sesión" });
        }
        res.json({ message: "Sesión cerrada correctamente" });
    });
});



// ✅ Registro de usuarios y autenticación desde `auth.js`
router.use('/auth', require('./auth.js'));  // 👈 Aquí se incluyen las rutas /auth/register, /auth/login, /auth/verify


// ✅ Mover Swagger a `/swagger/api-docs`
router.use('/swagger', require('./swagger.js'));

// ✅ Mantener autenticación con JWT y GitHub para rutas protegidas
router.use('/ldsChurchHistory', require('./ldsChurchHistory.js'));
router.use('/templeDedications', require('./templeDedications.js'));
router.use('/users', require('./users.js'));



// ✅ Manejo de rutas no encontradas (para evitar 404)
router.use('*', (req, res) => {
    console.log('Ruta no encontrada:', req.originalUrl);
    res.status(404).json({ message: 'Ruta no encontrada' });
});

module.exports = router;
