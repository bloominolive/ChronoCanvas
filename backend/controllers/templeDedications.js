const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');

const getSingle = async (req, res) => {
  //#swagger.tags=['Temple_Dedications']  
  const templeId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('Temple_Dedications').findOne({ _id: templeId });
  res.status(200).json(result);
};

const getAll = async (req, res) => {
  //#swagger.tags=['Temple_Dedications'] 
  const result = await mongodb.getDatabase().db().collection('Temple_Dedications').find().toArray();
  res.status(200).json(result);
};

console.log(JSON.stringify(getAll));

const createDedication = async (req, res) => {
//#swagger.tags=['Temple_Dedications'] 
  const newDedication = {
    temple: req.body.temple,
    dedication: req.body.dedication,
    dedicatedBy: req.body.dedicatedBy
  };
  const result = await mongodb.getDatabase().db().collection('Temple_Dedications').insertOne(newDedication);
  result.acknowledged ? res.status(201).json(result) : res.status(500).json({ error: 'Failed to create entry' });
};

const updateDedication = async (req, res) => {
  //#swagger.tags=['Temple_Dedications']   
  const templeId = new ObjectId(req.params.id);
  const updatedDedication = {
    temple: req.body.temple,
    dedication: req.body.dedication,
    dedicatedBy: req.body.dedicatedBy
  };
  const result = await mongodb.getDatabase().db().collection('Temple_Dedications').updateOne({ _id: templeId }, { $set: updatedDedication });
  result.modifiedCount > 0 ? res.status(200).json(result) : res.status(500).json({ error: 'Failed to update entry' });
};

const deleteDedication = async (req, res) => {
  //#swagger.tags=['Temple_Dedications']   
  const templeId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('Temple_Dedications').deleteOne({ _id: templeId });
  result.deletedCount > 0 ? res.status(200).send() : res.status(500).json({ error: 'Failed to delete entry' });
};

module.exports = {
  getSingle,
  getAll,
  createDedication,
  updateDedication,
  deleteDedication
};
