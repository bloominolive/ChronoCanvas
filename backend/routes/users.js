const router = require('express').Router();
const usersController = require('../controllers/users.js');
const validation = require('../middleware/validate.js');
//const { isAuthenticated } = require('../middleware/authenticate.js');
const { verifyToken, isAuthenticated } = require('../middleware/auth.js'); // Importamos el middleware de JWT

router.get('/:id', isAuthenticated,verifyToken, validation.checkMongoId, usersController.getSingle);
router.get('/', isAuthenticated,verifyToken, usersController.getAll);
router.post('/', isAuthenticated,verifyToken, validation.saveUser, usersController.createUser);
router.put('/:id', isAuthenticated,verifyToken, validation.checkMongoId, validation.saveUser, usersController.updateUser);
router.delete('/:id', isAuthenticated,verifyToken, validation.checkMongoId, usersController.deleteUser);

module.exports = router;