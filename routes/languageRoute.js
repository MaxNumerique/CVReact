const express = require('express');
const languageModel = require('../models/Language');
const languageRouter = express.Router();

// Ajouter une langue
languageRouter.post('/language', async (req, res) => {
  try {
    const newLanguage = new languageModel(req.body);
    console.log(newLanguage);
    const savedLanguage = await newLanguage.save();
    res.status(201).json(savedLanguage);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Récupérer toutes les langues
languageRouter.get('/languages', async (req, res) => {
  try {
    const languages = await languageModel.find();
    res.status(200).json(languages);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Récupère une langue par son id
languageRouter.get("/language/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const language = await languageModel.findById(id);
    res.json(language);
  } catch (err) {
    res.status(500).json(err);
  }
})

// Met à jour une langue par son id
languageRouter.put("/language/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const updatedLanguage = await languageModel.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedLanguage);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Supprime une langue par son id
languageRouter.delete("/language/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedLanguage = await languageModel.findByIdAndDelete(id);
    res.json(deletedLanguage);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = languageRouter;