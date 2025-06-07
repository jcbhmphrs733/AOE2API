const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags = ['Civs']
  //#swagger.description = 'Get all civilizations'
  const result = await mongodb.getDatabase().collection("civilizations").find();
  result
    .toArray()
    .then((civs) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(civs);
    })
    .catch((err) => {
      res.status(500).json({ error: "Could not fetch civ" });
    });
};

const getSingle = async (req, res) => {
  //#swagger.tags = ['Civs']
  //#swagger.description = 'Get a single civilization by ID'
  const civId = new ObjectId.createFromHexString(req.params.id);
  const result = await mongodb
    .getDatabase()
    .collection("civs")
    .find({ _id: civId });
  result
    .toArray()
    .then((civs) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(civs[0]);
    })
    .catch((err) => {
      res.status(500).json({ error: "Could not fetch civ" });
    });
};

const postCiv = async (req, res) => {
  //#swagger.tags = ['Civs']
  //#swagger.description = 'Create a new civilization'
  const newCiv = {
    name: req.body.name,
    type: req.body.type,
    castleTech: req.body.castleTech,
    impTech: req.body.impTech,
    uniqueUnit: req.body.uniqueUnit,
    teamBonus: req.body.teamBonus,
    bonus: req.body.bonus,
  };

  const response = await mongodb
    .getDatabase()
    .collection("civs")
    .insertOne(newCiv);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json({ error: "Could not create civ" });
  }
};

const putCiv = async (req, res) => {
  //#swagger.tags = ['Civs']
  //#swagger.description = 'Update an existing civilization by ID'
  const civId = new ObjectId.createFromHexString(req.params.id);
  const updatedCiv = {
    name: req.body.name,
    type: req.body.type,
    castleTech: req.body.castleTech,
    impTech: req.body.impTech,
    uniqueUnit: req.body.uniqueUnit,
    teamBonus: req.body.teamBonus,
    bonus: req.body.bonus,
  };

  const response = await mongodb
    .getDatabase()
    .collection("civs")
    .replaceOne({ _id: civId }, updatedCiv);
  if (response.modifiedCount > 0) {
    res.status(204).json({ message: "Civ updated successfully" });
  } else {
    res.status(500).json({ error: "Could not update civ" });
  }
};

const deleteCiv = async (req, res) => {
  //#swagger.tags = ['Civs']
  //#swagger.description = 'Delete a civilization by ID'
  const civId = new ObjectId.createFromHexString(req.params.id);
  const response = await mongodb
    .getDatabase()
    .collection("civs")
    .deleteOne({ _id: civId });
  if (response.deletedCount > 0) {
    res.status(204).json({ message: "Civ deleted successfully" });
  } else {
    res.status(500).json({ error: "Could not delete Civ" });
  }
};

module.exports = {
  getAll,
  getSingle,
  postCiv,
  putCiv,
  deleteCiv,
};
