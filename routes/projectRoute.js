const express = require('express');
const projectModel = require('../models/Project');
const projectRouter = express.Router();

// Ajouter un projet
projectRouter.post('/project', async (req, res) => {
  try {
    const newProject = new projectModel(req.body);
    console.log(newProject);
    const savedproject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Récupérer tous les projets
projectRouter.get('/projects', async (req, res) => {
  try {
    const projects = await projectModel.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Afficher un projet par son id
projectRouter.get("/project/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const project = await projectModel.findById(id);
    res.json(project);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Supprimer un projet par son id
projectRouter.delete("/project/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedProject = await projectModel.findByIdAndDelete(id);
    res.json(deletedProject);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Modifier un projet par son id
projectRouter.put("/project/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const updatedProject = await projectModel.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedProject);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = projectRouter;