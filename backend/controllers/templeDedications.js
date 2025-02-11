const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');

const getSingle = async (req, res) => {
    //#swagger.tags=['Temple_Dedications']
    try {
        const templeId = new ObjectId(req.params.id);
        const db = mongodb.getDatabase();
        
        const result = await db.collection('Temple_Dedications').findOne({ _id: templeId });
        
        if (!result) {
            return res.status(404).json({
                message: 'Dedicación del templo no encontrada',
                error: 'not_found'
            });
        }
        
        res.status(200).json({
            message: 'Dedicación del templo encontrada',
            data: result
        });
    } catch (error) {
        console.error('Error en getSingle:', error);
        res.status(500).json({
            message: 'Error al obtener la dedicación del templo',
            error: error.message
        });
    }
};

const getAll = async (req, res) => {
    //#swagger.tags=['Temple_Dedications']
    try {
        const db = mongodb.getDatabase();
        const result = await db.collection('Temple_Dedications').find().toArray();
        
        res.status(200).json({
            message: 'Dedicaciones de templos recuperadas exitosamente',
            data: result,
            count: result.length
        });
    } catch (error) {
        console.error('Error en getAll:', error);
        res.status(500).json({
            message: 'Error al obtener las dedicaciones de templos',
            error: error.message
        });
    }
};

const createDedication = async (req, res) => {
    //#swagger.tags=['Temple_Dedications']
    try {
        const { temple, dedication, dedicatedBy } = req.body;
        
        const newDedication = {
            temple,
            dedication: new Date(dedication),
            dedicatedBy,
            createdAt: new Date(),
            createdBy: req.user?.id || 'system'
        };

        const db = mongodb.getDatabase();
        const result = await db.collection('Temple_Dedications').insertOne(newDedication);

        if (!result.acknowledged) {
            return res.status(500).json({
                message: 'Error al crear la dedicación del templo',
                error: 'insert_failed'
            });
        }

        res.status(201).json({
            message: 'Dedicación del templo creada exitosamente',
            id: result.insertedId,
            data: newDedication
        });
    } catch (error) {
        console.error('Error en createDedication:', error);
        res.status(500).json({
            message: 'Error al crear la dedicación del templo',
            error: error.message
        });
    }
};

const updateDedication = async (req, res) => {
    //#swagger.tags=['Temple_Dedications']
    try {
        const templeId = new ObjectId(req.params.id);
        const { temple, dedication, dedicatedBy } = req.body;

        const updatedDedication = {
            temple,
            dedication: new Date(dedication),
            dedicatedBy,
            updatedAt: new Date(),
            updatedBy: req.user?.id || 'system'
        };

        const db = mongodb.getDatabase();
        const result = await db.collection('Temple_Dedications').updateOne(
            { _id: templeId },
            { $set: updatedDedication }
        );

        if (!result.matchedCount) {
            return res.status(404).json({
                message: 'Dedicación del templo no encontrada',
                error: 'not_found'
            });
        }

        if (!result.modifiedCount) {
            return res.status(400).json({
                message: 'No se realizaron cambios en la dedicación',
                error: 'no_changes'
            });
        }

        res.status(200).json({
            message: 'Dedicación del templo actualizada exitosamente',
            modifiedCount: result.modifiedCount
        });
    } catch (error) {
        console.error('Error en updateDedication:', error);
        res.status(500).json({
            message: 'Error al actualizar la dedicación del templo',
            error: error.message
        });
    }
};

const deleteDedication = async (req, res) => {
    //#swagger.tags=['Temple_Dedications']
    try {
        const templeId = new ObjectId(req.params.id);
        const db = mongodb.getDatabase();
        
        const result = await db.collection('Temple_Dedications').deleteOne({ _id: templeId });

        if (!result.deletedCount) {
            return res.status(404).json({
                message: 'Dedicación del templo no encontrada',
                error: 'not_found'
            });
        }

        res.status(200).json({
            message: 'Dedicación del templo eliminada exitosamente',
            deletedCount: result.deletedCount
        });
    } catch (error) {
        console.error('Error en deleteDedication:', error);
        res.status(500).json({
            message: 'Error al eliminar la dedicación del templo',
            error: error.message
        });
    }
};

module.exports = {
    getSingle,
    getAll,
    createDedication,
    updateDedication,
    deleteDedication
};