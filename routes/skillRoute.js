const express = require('express');
const skillModel = require('../models/Skill');
const skillRouter = express.Router();

// Ajouter une skill
skillRouter.post('/skill', async (req, res) => {
  try {
    const newSkill = new skillModel(req.body);
    const savedSkill = await newSkill.save();
    res.status(201).json(savedSkill);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Récupérer toutes les skills
skillRouter.get('/skills', async (req, res) => {
  try {
    const skills = await skillModel.find();
    res.status(200).json(skills);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Récupérer une skill par son id
skillRouter.get("/skill/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const skill = await skillModel.findById(id);
    res.status(200).json(skill);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Modifier une skill par son id
skillRouter.put("/skill/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const updatedSkill = await skillModel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedSkill);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Supprimer une skill par son id
skillRouter.delete("/skill/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedSkill = await skillModel.findByIdAndDelete(id);
    res.json(deletedSkill);
    res.status(200).json(deletedSkill);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = skillRouter;
