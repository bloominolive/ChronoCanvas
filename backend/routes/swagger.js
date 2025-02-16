const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const jwt = require('jsonwebtoken');

// Middleware personalizado para verificar autenticación
const checkAuth = (req, res, next) => {
    // Verificar sesión de GitHub
    if (req.session && req.session.user) {
        return next();
    }

    // Verificar token JWT
    const token = req.headers.authorization?.split(' ')[1] || req.session?.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            return next();
        } catch (error) {
            console.error('Error verificando token:', error);
            return res.status(401).json({ 
                message: 'Token inválido',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }

    // Si no hay autenticación, redirigir a la página principal
    res.redirect('/');
};

// Configuración personalizada de Swagger UI
const swaggerUiOptions = {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "ChronoCanvas API Documentation",
    swaggerOptions: {
        persistAuthorization: true
    }
};

// Rutas de Swagger
router.use('/api-docs', checkAuth, swaggerUi.serve);
router.get('/api-docs', checkAuth, swaggerUi.setup(swaggerDocument, swaggerUiOptions));
//router.use('/api-docs', swaggerUi.serve);
//router.get('/api-docs', swaggerUi.setup(swaggerDocument, swaggerUiOptions));
module.exports = router;