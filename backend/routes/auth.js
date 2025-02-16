const Router = require('express').Router();
const bcrypt = require('bcryptjs');
const { generateToken, verifyToken } = require('../middleware/auth.js');
const mongodb = require('../data/database.js');
const validation = require('../middleware/validate.js');
// Registro (ruta pública)
Router.post('/register', validation.saveUser, async (req, res) => {
    const { firstName, lastName, email, password, birthDate } = req.body;
    
    try {
        // Verificar conexión a la base de datos
        const db = mongodb.getDatabase();
        if (!db) {
            console.error("No se pudo obtener la conexión a la base de datos");
            return res.status(500).json({ 
                message: 'Error de conexión a la base de datos',
                error: 'database_connection_failed'
            });
        }

        // Verificar si el usuario ya existe
        const existingUser = await db.collection('users').findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                message: 'El email ya está registrado',
                error: 'email_exists'
            });
        }

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Crear objeto de usuario
        const user = {
            firstName,
            lastName,
            email,
            password: hashedPassword,
            birthDate: new Date(birthDate),
            authType: 'local',
            createdAt: new Date()
        };

        // Insertar usuario
        const result = await db.collection('users').insertOne(user);
        
        if (!result.acknowledged) {
            console.error("Error al insertar usuario:", result);
            return res.status(500).json({ 
                message: 'Error al crear usuario',
                error: 'insert_failed'
            });
        }

        // Generar token y establecer sesión
        const token = generateToken(user);
        req.session.user = user;
        req.session.token = token;

        // Respuesta exitosa
        res.status(201).json({ 
            message: 'Usuario registrado exitosamente',
            token,
            user: { 
                id: result.insertedId,
                firstName, 
                lastName, 
                email 
            }
        });

    } catch (error) {
        console.error("Error detallado en registro:", error);
        res.status(500).json({ 
            message: 'Error interno del servidor',
            error: error.message
        });
    }
});

// Login con JWT
Router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // Validación básica
        if (!email || !password) {
            return res.status(400).json({ 
                message: 'Email y contraseña son requeridos',
                error: 'missing_credentials'
            });
        }

        // Obtener la base de datos
        const db = mongodb.getDatabase();
        if (!db) {
            console.error("Error de conexión a la base de datos");
            return res.status(500).json({ 
                message: 'Error de conexión a la base de datos',
                error: 'database_connection_failed'
            });
        }

        // Buscar usuario
        const user = await db.collection('users').findOne({ email });
        if (!user) {
            return res.status(401).json({ 
                message: 'Credenciales inválidas',
                error: 'invalid_credentials'
            });
        }

        // Verificar contraseña
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ 
                message: 'Credenciales inválidas',
                error: 'invalid_credentials'
            });
        }

        // Generar token
        const token = generateToken(user);
        
        // Establecer sesión
        if (req.session) {
            req.session.user = {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            };
            req.session.token = token;
        }

        // Respuesta exitosa
        res.status(200).json({ 
            message: 'Login exitoso',
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Error detallado en login:", error);
        res.status(500).json({ 
            message: 'Error interno del servidor',
            error: error.message 
        });
    }
});

// Verificar token
Router.get('/verify', verifyToken, (req, res) => {
    res.status(200).json({ valid: true, user: req.user });
});

module.exports = Router;