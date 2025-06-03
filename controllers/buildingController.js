const mongodb = require('../db/mongodb');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().collection('buildings').find();
    result.toArray()
        .then((buildings) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(buildings);
        })
        .catch(err => {
            res.status(500).json({ error: 'Could not fetch building' });
        });
}

const getSingle = async (req, res) => {
    const buildingId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().collection('buildings').find({ _id: buildingId });
    result.toArray()
        .then((buildings) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(buildings[0]);
        })
        .catch(err => {
            res.status(500).json({ error: 'Could not fetch building' });
        });
}

const postBuilding = async (req, res) => {;
    const newBuilding = {
        name: req.body.name,
        baseHp: req.body.baseHp,
        cost: req.body.cost
    };

    const response = await mongodb.getDatabase().collection('buildings').insertOne(newBuilding);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json({ error: 'Could not create Building' });
    }
}

const putBuilding = async (req, res) => {
    const buildingId = new ObjectId(req.params.id);
    const updatedBuilding = {
        name: req.body.name,
        baseHp: req.body.baseHp,
        cost: req.body.cost
    };

    const response = await mongodb.getDatabase().collection('buildings').replaceOne({ _id: buildingId }, updatedBuilding);
    if (response.modifiedCount > 0) {
        res.status(204).json({ message: 'Building updated successfully' });
    } else {
        res.status(500).json({ error: 'Could not update Building' });
    }
}

const deleteBuilding = async (req, res) => {
    const buildingId = new ObjectId(req.params.id); 
    const response = await mongodb.getDatabase().collection('buildings').deleteOne({ _id: buildingId });
    if (response.deletedCount > 0) {
        res.status(204).json({ message: 'Building deleted successfully' });
    } else {
        res.status(500).json({ error: 'Could not delete Building' });
    }
}

module.exports = {
    getAll,
    getSingle,
    postBuilding,
    putBuilding,
    deleteBuilding
};