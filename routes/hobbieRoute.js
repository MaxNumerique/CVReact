const express = require('express');
const hobbieModel = require('../models/Hobbie');
const hobbieRouter = express.Router();

// Ajouter une information
hobbieRouter.post('/hobbie', async (req, res) => {
  try {
    const newHobbie = new hobbieModel(req.body);
    const savedHobbie = await newHobbie.save();
    res.status(201).json(savedHobbie);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Récupérer toutes les informations
hobbieRouter.get('/hobbies', async (req, res) => {
  try {
    const hobbies = await hobbieModel.find();
    res.status(200).json(hobbies);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Récupérer une information par son id
hobbieRouter.get("/hobbie/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const hobbie = await hobbieModel.findById(id);
    res.status(200).json(hobbie);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Modifier une information par son id
hobbieRouter.put("/hobbie/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const updatedHobbie = await hobbieModel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedHobbie);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Supprimer une information par son id
hobbieRouter.delete("/hobbie/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedHobbie = await hobbieModel.findByIdAndDelete(id);
    res.json(deletedHobbie);
    res.status(200).json(deletedHobbie);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = hobbieRouter;
