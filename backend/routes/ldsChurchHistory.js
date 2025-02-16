const router = require('express').Router();
const historyController = require('../controllers/ldsChurchHistory.js');
const validation = require('../middleware/validate.js');
const { verifyToken, isAuthenticated } = require('../middleware/auth.js');
// Obtener un registro por ID (JWT o Passport)
router.get('/:id', validation.checkMongoId, historyController.getSingle);

// Obtener todos los registros (JWT o Passport)
router.get('/', historyController.getAll);

// Crear un nuevo registro (JWT o Passport)
router.post('/', isAuthenticated, verifyToken, validation.saveChurchHistory, historyController.createHistory);

// Actualizar un registro existente (JWT o Passport)
router.put('/:id', isAuthenticated, verifyToken, validation.checkMongoId, validation.saveChurchHistory, historyController.updateHistory);

// Eliminar un registro (JWT o Passport)
router.delete('/:id', isAuthenticated, verifyToken, validation.checkMongoId, historyController.deleteHistory);

module.exports = router;
