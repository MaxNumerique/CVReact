const express = require('express');
const userModel = require('../models/User');
const userRouter = express.Router();

// Ajouter une user
userRouter.post('/user', async (req, res) => {
  try {
    const newUser = new userModel(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Récupérer toutes les users
userRouter.get('/users', async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Récupérer une user par son id
userRouter.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userModel.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Modifier une user par son id
userRouter.put("/user/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const updatedUser = await userModel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Supprimer une user par son id
userRouter.delete("/user/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedUser = await userModel.findByIdAndDelete(id);
    res.json(deletedUser);
    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = userRouter;
