const mongodb = require('../db/mongodb');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().collection('units').find();
    result.toArray()
        .then((units) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(units);
        })
        .catch(err => {
            res.status(500).json({ error: 'Could not fetch unit' });
        });
}

const getSingle = async (req, res) => {
    const unitId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().collection('units').find({ _id: unitId });
    result.toArray()
        .then((units) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(units[0]);
        })
        .catch(err => {
            res.status(500).json({ error: 'Could not fetch unit' });
        });
}

const postUnit = async (req, res) => {;
    const newUnit = {
        name: req.body.name,
        type: req.body.type,
        castleTech: req.body.castleTech,
        impTech: req.body.impTech,
        uniqueUnit: req.body.uniqueUnit,
        teamBonus: req.body.teamBonus,
        bonus: req.body.bonus
    };

    const response = await mongodb.getDatabase().collection('units').insertOne(newUnit);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json({ error: 'Could not create unit' });
    }
}

const putUnit = async (req, res) => {
    const unitId = new ObjectId(req.params.id);
    const updatedUnit = {
        name: req.body.name,
        type: req.body.type,
        castleTech: req.body.castleTech,
        impTech: req.body.impTech,
        uniqueUnit: req.body.uniqueUnit,
        teamBonus: req.body.teamBonus,
        bonus: req.body.bonus
    };

    const response = await mongodb.getDatabase().collection('units').replaceOne({ _id: unitId }, updatedUnit);
    if (response.modifiedCount > 0) {
        res.status(204).json({ message: 'Unit updated successfully' });
    } else {
        res.status(500).json({ error: 'Could not update unit' });
    }
}

const deleteUnit = async (req, res) => {
    const unitId = new ObjectId(req.params.id); 
    const response = await mongodb.getDatabase().collection('units').deleteOne({ _id: unitId });
    if (response.deletedCount > 0) {
        res.status(204).json({ message: 'Unit deleted successfully' });
    } else {
        res.status(500).json({ error: 'Could not delete unit' });
    }
}

module.exports = {
    getAll,
    getSingle,
    postUnit,
    putUnit,
    deleteUnit
};