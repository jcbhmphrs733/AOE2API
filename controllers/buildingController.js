const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags = ['Buildings']
  //#swagger.description = 'Get all buildings'
  try {
    const result = await mongodb.getDatabase().collection("buildings").find();
    result.toArray().then((buildings) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(buildings);
    });
  } catch (err) {
    console.error("Error fetching buildings:", err);
    res.status(500).json({ error: "Could not fetch buildings" });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags = ['Buildings']
  //#swagger.description = 'Get a single building by ID'
  try {
    const buildingId = ObjectId.createFromHexString(req.params.id);
    const result = await mongodb
      .getDatabase()
      .collection("buildings")
      .find({ _id: buildingId });
    result
      .toArray()
      .then((buildings) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(buildings[0]);
      })
      .catch((err) => {
        res.status(500).json({ error: "Could not fetch building" });
      });
  } catch (err) {
    console.error("Error fetching building:", err);
  }
};

const postBuilding = async (req, res) => {
  //#swagger.tags = ['Buildings']
  //#swagger.description = 'Create a new building'
  try {
    const newBuilding = {
      name: req.body.name,
      baseHp: req.body.baseHp,
      cost: req.body.cost,
    };

    const response = await mongodb
      .getDatabase()
      .collection("buildings")
      .insertOne(newBuilding);
    if (response.acknowledged) {
      res.status(204).send();
    } else {
      res.status(500).json({ error: "Could not create Building" });
    }
  } catch (err) {
    console.error("Error creating building:", err);
    res.status(500).json({ error: "Could not create building" });
  }
};

const putBuilding = async (req, res) => {
  //#swagger.tags = ['Buildings']
  //#swagger.description = 'Update an existing building by ID'
  try {
    const buildingId = ObjectId.createFromHexString(req.params.id);
    const updatedBuilding = {
      name: req.body.name,
      baseHp: req.body.baseHp,
      cost: req.body.cost,
    };

    const response = await mongodb
      .getDatabase()
      .collection("buildings")
      .replaceOne({ _id: buildingId }, updatedBuilding);
    if (response.modifiedCount > 0) {
      res.status(204).json({ message: "Building updated successfully" });
    } else {
      res.status(500).json({ error: "Could not update Building" });
    }
  } catch (err) {
    console.error("Error updating building:", err);
    res.status(500).json({ error: "Could not update building" });
  }
};

const deleteBuilding = async (req, res) => {
  //#swagger.tags = ['Buildings']
  //#swagger.description = 'Delete a building by ID'
  try {
    const buildingId = ObjectId.createFromHexString(req.params.id);
    const response = await mongodb
      .getDatabase()
      .collection("buildings")
      .deleteOne({ _id: buildingId });
    if (response.deletedCount > 0) {
      res.status(204).json({ message: "Building deleted successfully" });
    } else {
      res.status(500).json({ error: "Could not delete Building" });
    }
  } catch (err) {
    console.error("Error deleting building:", err);
    res.status(500).json({ error: "Could not delete building" });
  }
};

module.exports = {
  getAll,
  getSingle,
  postBuilding,
  putBuilding,
  deleteBuilding,
};
