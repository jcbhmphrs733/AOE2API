const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags = ['Techs']
  //#swagger.description = 'Get all technologies'
  try {
    const result = await mongodb
      .getDatabase()
      .collection("technologies")
      .find();
    result
      .toArray()
      .then((tech) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(tech);
      })
      .catch((err) => {
        res.status(500).json({ error: "Could not fetch tech" });
      });
  } catch (err) {
    console.error("Error fetching technologies:", err);
    res.status(500).json({ error: "Could not fetch technologies" });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags = ['Techs']
  //#swagger.description = 'Get a single technology by ID'
  try {
    const techId = ObjectId.createFromHexString(req.params.id);
    const result = await mongodb
      .getDatabase()
      .collection("technologies")
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
  } catch (err) {
    console.error("Error fetching technology:", err);
    res.status(500).json({ error: "Could not fetch technology" });
  }
};

const postTech = async (req, res) => {
  //#swagger.tags = ['Techs']
  //#swagger.description = 'Create a new technology'
  try {
    const newTech = {
      name: req.body.name,
      castleTech: req.body.castleTech,
      castleTechCost: req.body.castleTechCost,
      impTech: req.body.impTech,
      impTechCost: req.body.impTechCost
    };

    const response = await mongodb
      .getDatabase()
      .collection("technologies")
      .insertOne(newTech);
    if (response.acknowledged) {
      res.status(204).send();
    } else {
      res.status(500).json({ error: "Could not create tech" });
    }
  } catch (err) {
    console.error("Error creating technology:", err);
    res.status(500).json({ error: "Could not create technology" });
  }
};

const putTech = async (req, res) => {
  //#swagger.tags = ['Techs']
  //#swagger.description = 'Update an existing technology by ID'
  try {
    const techId = ObjectId.createFromHexString(req.params.id);
    const updatedTech = {
      name: req.body.name,
      castleTech: req.body.castleTech,
      castleTechCost: req.body.castleTechCost,
      impTech: req.body.impTech,
      impTechCost: req.body.impTechCost
    };

    const response = await mongodb
      .getDatabase()
      .collection("technologies")
      .replaceOne({ _id: techId }, updatedTech);
    if (response.modifiedCount > 0) {
      res.status(204).json({ message: "tech updated successfully" });
    } else {
      res.status(500).json({ error: "Could not update tech" });
    }
  } catch (err) {
    console.error("Error updating technology:", err);
    res.status(500).json({ error: "Could not update technology" });
  }
};

const deleteTech = async (req, res) => {
  //#swagger.tags = ['Techs']
  //#swagger.description = 'Delete a technology by ID'
  try {
    const techId = ObjectId.createFromHexString(req.params.id);
    const response = await mongodb
      .getDatabase()
      .collection("technologies")
      .deleteOne({ _id: techId });
    if (response.deletedCount > 0) {
      res.status(204).json({ message: "tech deleted successfully" });
    } else {
      res.status(500).json({ error: "Could not delete tech" });
    }
  } catch (err) {
    console.error("Error deleting technology:", err);
  }
};

module.exports = {
  getAll,
  getSingle,
  postTech,
  putTech,
  deleteTech,
};
