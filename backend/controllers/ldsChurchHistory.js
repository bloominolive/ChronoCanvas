const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');

const getSingle = async (req, res) => {
    //#swagger.tags=['Church_History']
    try {
        const historyId = new ObjectId(req.params.id);
        const db = mongodb.getDatabase();
        
        const result = await db.collection('Church_History').findOne({ _id: historyId });
        
        if (!result) {
            return res.status(404).json({
                message: 'Registro histórico no encontrado',
                error: 'not_found'
            });
        }
        
        res.status(200).json({
            message: 'Registro histórico encontrado',
            data: result
        });
    } catch (error) {
        console.error('Error en getSingle:', error);
        res.status(500).json({
            message: 'Error al obtener el registro histórico',
            error: error.message
        });
    }
};

const getAll = async (req, res) => {
    //#swagger.tags=['Church_History']
    try {
        const db = mongodb.getDatabase();
        const result = await db.collection('Church_History').find().toArray();
        
        res.status(200).json({
            message: 'Registros históricos recuperados exitosamente',
            data: result,
            count: result.length
        });
    } catch (error) {
        console.error('Error en getAll:', error);
        res.status(500).json({
            message: 'Error al obtener los registros históricos',
            error: error.message
        });
    }
};

const createHistory = async (req, res) => {
  //#swagger.tags=['Church_History']
  try {
      const { event_name, event_date, description } = req.body;
      
      const newHistory = {
          event_name,
          event_date,
          description,
          createdAt: new Date(),
          createdBy: req.user?.id || 'system'
      };

      const db = mongodb.getDatabase();
      const result = await db.collection('Church_History').insertOne(newHistory);

      if (!result.acknowledged) {
          return res.status(500).json({
              message: 'Error al crear el registro histórico',
              error: 'insert_failed'
          });
      }

      res.status(201).json({
          message: 'Registro histórico creado exitosamente',
          id: result.insertedId,
          data: newHistory
      });
  } catch (error) {
      console.error('Error en createHistory:', error);
      res.status(500).json({
          message: 'Error al crear el registro histórico',
          error: error.message
      });
  }
};

const updateHistory = async (req, res) => {
  //#swagger.tags=['Church_History']
  try {
      // Validación del ID
      if (!req.params.id || !ObjectId.isValid(req.params.id)) {
          return res.status(400).json({
              message: 'ID de registro inválido',
              error: 'invalid_history_id'
          });
      }

      const historyId = new ObjectId(req.params.id);
      const { event_name, event_date, description } = req.body;

      const updatedHistory = {
          event_name,
          event_date,
          description,
          updatedAt: new Date(),
          updatedBy: req.user?.id || 'system'
      };

      const db = mongodb.getDatabase();
      const result = await db.collection('Church_History').updateOne(
          { _id: historyId },
          { $set: updatedHistory }
      );

      if (!result.matchedCount) {
          return res.status(404).json({
              message: 'Registro histórico no encontrado',
              error: 'not_found'
          });
      }

      // Obtener el documento actualizado para devolverlo en la respuesta
      const updatedDocument = await db.collection('Church_History').findOne(
          { _id: historyId }
      );

      res.status(200).json({
          message: 'Registro histórico actualizado exitosamente',
          data: updatedDocument
      });
  } catch (error) {
      console.error('Error en updateHistory:', error);
      res.status(500).json({
          message: 'Error al actualizar el registro histórico',
          error: error.message
      });
  }
};

const deleteHistory = async (req, res) => {
    //#swagger.tags=['Church_History']
    try {
        const historyId = new ObjectId(req.params.id);
        const db = mongodb.getDatabase();
        
        const result = await db.collection('Church_History').deleteOne({ _id: historyId });

        if (!result.deletedCount) {
            return res.status(404).json({
                message: 'Registro histórico no encontrado',
                error: 'not_found'
            });
        }

        res.status(200).json({
            message: 'Registro histórico eliminado exitosamente',
            deletedCount: result.deletedCount
        });
    } catch (error) {
        console.error('Error en deleteHistory:', error);
        res.status(500).json({
            message: 'Error al eliminar el registro histórico',
            error: error.message
        });
    }
};

module.exports = {
    getSingle,
    getAll,
    createHistory,
    updateHistory,
    deleteHistory
};