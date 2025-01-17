const express = require('express');
const informationModel = require('../models/Information');
const informationRouter = express.Router();

// Ajouter une information
informationRouter.post('/information', async (req, res) => {
  try {
    const newInformation = new informationModel(req.body);
    const savedInformation = await newInformation.save();
    res.status(201).json(savedInformation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Récupérer toutes les informations
informationRouter.get('/informations', async (req, res) => {
  try {
    const informations = await informationModel.find();
    res.status(200).json(informations);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Récupérer une information par son id
informationRouter.get("/information/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const information = await informationModel.findById(id);
    res.status(200).json(information);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Modifier une information par son id
informationRouter.put("/information/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const updatedInformation = await informationModel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedInformation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Supprimer une information par son id
informationRouter.delete("/information/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedInformation = await informationModel.findByIdAndDelete(id);
    res.json(deletedInformation);
    res.status(200).json(deletedInformation);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = informationRouter;