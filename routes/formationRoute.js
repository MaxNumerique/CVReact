const express = require('express');
const formationModel = require('../models/Formation');
const formationRouter = express.Router();

// Ajouter une information
formationRouter.post('/formation', async (req, res) => {
  try {
    const newFormation = new formationModel(req.body);
    const savedFormation = await newFormation.save();
    res.status(201).json(savedFormation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Récupérer toutes les informations
formationRouter.get('/formations', async (req, res) => {
  try {
    const formations = await formationModel.find();
    res.status(200).json(formations);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Récupérer une information par son id
formationRouter.get("/formation/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const formation = await formationModel.findById(id);
    res.status(200).json(formation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Modifier une information par son id
formationRouter.put("/formation/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const updatedFormation = await formationModel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedFormation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Supprimer une information par son id
formationRouter.delete("/formation/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedFormation = await formationModel.findByIdAndDelete(id);
    res.json(deletedFormation);
    res.status(200).json(deletedFormation);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = formationRouter;
