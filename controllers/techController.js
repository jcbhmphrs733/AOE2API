const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags = ['Techs']
  //#swagger.description = 'Get all technologies'
  const result = await mongodb.getDatabase().collection("technologies").find();
  result
    .toArray()
    .then((tech) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(tech);
    })
    .catch((err) => {
      res.status(500).json({ error: "Could not fetch tech" });
    });
};

const getSingle = async (req, res) => {
  //#swagger.tags = ['Techs']
  //#swagger.description = 'Get a single technology by ID'
  const techId = new ObjectId.createFromHexString(req.params.id);
  const result = await mongodb
    .getDatabase()
    .collection("tech")
    .find({ _id: techId });
  result
    .toArray()
    .then((tech) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(tech[0]);
    })
    .catch((err) => {
      res.status(500).json({ error: "Could not fetch tech" });
    });
};

const postTech = async (req, res) => {
  //#swagger.tags = ['Techs']
  //#swagger.description = 'Create a new technology'
  const newTech = {
    name: req.body.name,
    cost: req.body.name,
    ageAvailable: req.body.name,
    description: req.body.name,
  };

  const response = await mongodb
    .getDatabase()
    .collection("tech")
    .insertOne(newTech);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json({ error: "Could not create tech" });
  }
};

const putTech = async (req, res) => {
  //#swagger.tags = ['Techs']
  //#swagger.description = 'Update an existing technology by ID'
  const techId = new ObjectId.createFromHexString(req.params.id);
  const updatedTech = {
    name: req.body.name,
    cost: req.body.name,
    ageAvailable: req.body.name,
    description: req.body.name,
  };

  const response = await mongodb
    .getDatabase()
    .collection("tech")
    .replaceOne({ _id: techId }, updatedTech);
  if (response.modifiedCount > 0) {
    res.status(204).json({ message: "tech updated successfully" });
  } else {
    res.status(500).json({ error: "Could not update tech" });
  }
};

const deleteTech = async (req, res) => {
  //#swagger.tags = ['Techs']
  //#swagger.description = 'Delete a technology by ID'
  const techId = new ObjectId.createFromHexString(req.params.id);
  const response = await mongodb
    .getDatabase()
    .collection("tech")
    .deleteOne({ _id: techId });
  if (response.deletedCount > 0) {
    res.status(204).json({ message: "tech deleted successfully" });
  } else {
    res.status(500).json({ error: "Could not delete tech" });
  }
};

module.exports = {
  getAll,
  getSingle,
  postTech,
  putTech,
  deleteTech,
};
