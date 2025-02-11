const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');
const bcrypt = require('bcryptjs');

// Función auxiliar para formatear fechas
const formatDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    return `${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getDate().toString().padStart(2, '0')}/${d.getFullYear()}`;
};

// Función para formatear las fechas en un objeto usuario
const formatUserDates = (user) => {
    if (!user) return null;
    return {
        ...user,
        birthDate: formatDate(user.birthDate),
        createdAt: formatDate(user.createdAt),
        updatedAt: user.updatedAt ? formatDate(user.updatedAt) : undefined
    };
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Users']
  try {
      // Validación del ID
      if (!req.params.id || !ObjectId.isValid(req.params.id)) {
          return res.status(400).json({
              message: 'ID de usuario inválido',
              error: 'invalid_user_id'
          });
      }

      const userId = new ObjectId(req.params.id);
      const db = mongodb.getDatabase();

      // Buscar el usuario excluyendo solo el password
      const user = await db.collection('users').findOne(
          { _id: userId },
          { projection: { password: 0 } }
      );

      // Validación si el usuario no existe
      if (!user) {
          return res.status(404).json({
              message: 'Usuario no encontrado',
              error: 'user_not_found'
          });
      }

      // Retornar usuario con fechas formateadas
      res.status(200).json({
          message: 'Usuario encontrado exitosamente',
          user: formatUserDates(user)
      });
  } catch (error) {
      console.error('Error en getSingle:', error);
      res.status(500).json({
          message: 'Error al obtener usuario',
          error: error.message || 'internal_server_error'
      });
  }
};

const getAll = async (req, res) => {
  //#swagger.tags=['Users']
    try {
        const db = mongodb.getDatabase();
        const users = await db.collection('users').find(
            {},
            { projection: { password: 0 } }
        ).toArray();

        const formattedUsers = users.map(formatUserDates);

        res.status(200).json({
            message: 'Usuarios recuperados exitosamente',
            users: formattedUsers,
            count: users.length
        });
    } catch (error) {
        console.error('Error en getAll:', error);
        res.status(500).json({
            message: 'Error al obtener usuarios',
            error: error.message
        });
    }
};

const createUser = async (req, res) => {
  //#swagger.tags=['Users']
    try {
        const newUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            birthDate: new Date(req.body.birthDate),
            createdAt: new Date()
        };

        const result = await mongodb.getDatabase().db().collection('users').insertOne(newUser);

        if (!result.acknowledged) {
            return res.status(500).json({
                message: 'Error al crear usuario',
                error: 'insert_failed'
            });
        }

        const createdUser = { ...newUser, _id: result.insertedId };
        delete createdUser.password; // No devolver el password

        res.status(201).json({
            message: 'Usuario creado exitosamente',
            user: formatUserDates(createdUser)
        });
    } catch (error) {
        console.error('Error en createUser:', error);
        res.status(500).json({
            message: 'Error al crear usuario',
            error: error.message
        });
    }
};

const updateUser = async (req, res) => {
  //#swagger.tags=['Users']
  try {
      const db = mongodb.getDatabase();
      const userId = new ObjectId(req.params.id);
      const updatedUser = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          birthDate: new Date(req.body.birthDate),
          updatedAt: new Date()
      };

      // Si se proporciona password, hashearlo antes de guardar
      if (req.body.password) {
          const hashedPassword = await bcrypt.hash(req.body.password, 10);
          updatedUser.password = hashedPassword;
      }

      const result = await db.collection('users').updateOne(
          { _id: userId },
          { $set: updatedUser }
      );

      if (!result.matchedCount) {
          return res.status(404).json({
              message: 'Usuario no encontrado',
              error: 'user_not_found'
          });
      }

      // Obtener el usuario actualizado (sin el password)
      const updated = await db.collection('users').findOne(
          { _id: userId },
          { projection: { password: 0 } }
      );

      res.status(200).json({
          message: 'Usuario actualizado exitosamente',
          user: formatUserDates(updated)
      });
  } catch (error) {
      console.error('Error en updateUser:', error);
      res.status(500).json({
          message: 'Error al actualizar usuario',
          error: error.message
      });
  }
};

const deleteUser = async (req, res) => {
  //#swagger.tags=['Users']
  try {
      const db = mongodb.getDatabase();
      const userId = new ObjectId(req.params.id);

      // Primero verificamos si el usuario existe
      const userExists = await db.collection('users').findOne(
          { _id: userId },
          { projection: { _id: 1 } }
      );

      if (!userExists) {
          return res.status(404).json({
              message: 'Usuario no encontrado',
              error: 'user_not_found'
          });
      }

      // Procedemos con la eliminación
      const result = await db.collection('users').deleteOne({ _id: userId });

      if (!result.deletedCount) {
          return res.status(500).json({
              message: 'Error al eliminar usuario',
              error: 'delete_failed'
          });
      }

      res.status(200).json({
          message: 'Usuario eliminado exitosamente',
          deletedId: userId.toString()
      });
  } catch (error) {
      console.error('Error en deleteUser:', error);
      res.status(500).json({
          message: 'Error al eliminar usuario',
          error: error.message
      });
  }
};

module.exports = {
    getSingle,
    getAll,
    createUser,
    updateUser,
    deleteUser
};