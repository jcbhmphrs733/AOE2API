const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags = ['Units']
  //#swagger.description = 'Get all units'
  try {
    const result = await mongodb.getDatabase().collection("units").find();
    result
      .toArray()
      .then((units) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(units);
      })
      .catch((err) => {
        res.status(500).json({ error: "Could not fetch unit" });
      });
  } catch (err) {
    console.error("Error fetching units:", err);
    res.status(500).json({ error: "Could not fetch units" });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags = ['Units']
  //#swagger.description = 'Get a single unit by ID'
  try {
    const unitId = ObjectId.createFromHexString(req.params.id);
    const result = await mongodb
      .getDatabase()
      .collection("units")
      .find({ _id: unitId });
    result
      .toArray()
      .then((units) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(units[0]);
      })
      .catch((err) => {
        res.status(500).json({ error: "Could not fetch unit" });
      });
  } catch (err) {
    console.error("Error fetching unit:", err);
    res.status(500).json({ error: "Could not fetch unit" });
  }
};

const postUnit = async (req, res) => {
  //#swagger.tags = ['Units']
  //#swagger.description = 'Create a new unit'
  try {
    const newUnit = {
      name: req.body.name,
      baseHp: req.body.baseHp,
      cost: req.body.cost,
      type: req.body.type,
      baseAtk: req.body.baseAtk,
      baseRange: req.body.baseRange,
      moveSpeed: req.body.moveSpeed,
    };

    const response = await mongodb
      .getDatabase()
      .collection("units")
      .insertOne(newUnit);
    if (response.acknowledged) {
      res.status(204).send();
    } else {
      res.status(500).json({ error: "Could not create unit" });
    }
  } catch (err) {
    console.error("Error creating unit:", err);
    res.status(500).json({ error: "Could not create unit" });
  }
};

const putUnit = async (req, res) => {
  //#swagger.tags = ['Units']
  //#swagger.description = 'Update an existing unit by ID'
  try {
    const unitId = ObjectId.createFromHexString(req.params.id);
    const updatedUnit = {
      name: req.body.name,
      baseHp: req.body.baseHp,
      cost: req.body.cost,
      type: req.body.type,
      baseAtk: req.body.baseAtk,
      baseRange: req.body.baseRange,
      moveSpeed: req.body.moveSpeed,
    };

    const response = await mongodb
      .getDatabase()
      .collection("units")
      .replaceOne({ _id: unitId }, updatedUnit);
    if (response.modifiedCount > 0) {
      res.status(204).json({ message: "Unit updated successfully" });
    } else {
      res.status(500).json({ error: "Could not update unit" });
    }
  } catch (err) {
    console.error("Error updating unit:", err);
    res.status(500).json({ error: "Could not update unit" });
  }
};

const deleteUnit = async (req, res) => {
  //#swagger.tags = ['Units']
  //#swagger.description = 'Delete a unit by ID'
  try {
    const unitId = ObjectId.createFromHexString(req.params.id);
    try {
      const response = await mongodb
        .getDatabase()
        .collection("units")
        .deleteOne({ _id: unitId });
      if (response.deletedCount > 0) {
        res.status(200).json({ message: "Unit deleted successfully" });
      } else {
        res.status(404).json({ error: "Unit not found" });
      }
    } catch (err) {
      res.status(500).json({ error: "Could not delete unit" });
    }
  } catch (err) {
    console.error("Error deleting unit:", err);
    res.status(500).json({ error: "Could not delete unit" });
  }
};

module.exports = {
  getAll,
  getSingle,
  postUnit,
  putUnit,
  deleteUnit,
};
