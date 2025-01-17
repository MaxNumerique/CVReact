const express = require('express');
const experienceModel = require('../models/Experience');
const experienceRouter = express.Router();

// Ajouter une expérience
experienceRouter.post('/experience', async (req, res) => {
  try {
    const newExperience = new experienceModel(req.body);
    const savedExperience = await newExperience.save();
    res.status(201).json(savedExperience);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Récupérer toutes les expériences
experienceRouter.get('/experiences', async (req, res) => {
  try {
    const experiences = await experienceModel.find();
    res.status(200).json(experiences);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Récupérer une expérience par son id
experienceRouter.get("/experience/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const experience = await experienceModel.findById(id);
    res.status(200).json(experience);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Modifier une expérience par son id
experienceRouter.put("/experience/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const updatedExperience = await experienceModel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedExperience);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Supprimer une expérience par son id
experienceRouter.delete("/experience/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedExperience = await experienceModel.findByIdAndDelete(id);
    res.json(deletedExperience);
    res.status(200).json(deletedExperience);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = experienceRouter;
