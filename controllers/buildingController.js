const mongodb = require('../db/mongodb');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().collection('civs').find();
    result.toArray()
        .then((civs) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(civs);
        })
        .catch(err => {
            res.status(500).json({ error: 'Could not fetch civ' });
        });
}

const getSingle = async (req, res) => {
    const civId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().collection('civs').find({ _id: civId });
    result.toArray()
        .then((civs) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(civs[0]);
        })
        .catch(err => {
            res.status(500).json({ error: 'Could not fetch civ' });
        });
}

const postBuilding = async (req, res) => {;
    const newCiv = {
        name: req.body.name,
        baseHp: req.body.baseHp,
        cost: req.body.cost
    };

    const response = await mongodb.getDatabase().collection('civs').insertOne(newCiv);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json({ error: 'Could not create civ' });
    }
}

const putBuilding = async (req, res) => {
    const civId = new ObjectId(req.params.id);
    const updatedCiv = {
        name: req.body.name,
        baseHp: req.body.baseHp,
        cost: req.body.cost
    };

    const response = await mongodb.getDatabase().collection('civs').replaceOne({ _id: civId }, updatedCiv);
    if (response.modifiedCount > 0) {
        res.status(204).json({ message: 'civ updated successfully' });
    } else {
        res.status(500).json({ error: 'Could not update civ' });
    }
}

const deleteBuilding = async (req, res) => {
    const civId = new ObjectId(req.params.id); 
    const response = await mongodb.getDatabase().collection('civs').deleteOne({ _id: civId });
    if (response.deletedCount > 0) {
        res.status(204).json({ message: 'Civ deleted successfully' });
    } else {
        res.status(500).json({ error: 'Could not delete Civ' });
    }
}

module.exports = {
    getAll,
    getSingle,
    postBuilding,
    putBuilding,
    deleteBuilding
};