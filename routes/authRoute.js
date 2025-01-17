const express = require('express');
const userModel = require('../models/User');
const jwt = require('jsonwebtoken');
const authRouter = express.Router();

// Création de la clé pour jwt
const secret = process.env.SECRET;

// Route pour inscrire un utilisateur
authRouter.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      const userExists = await userModel.findOne({ email });
      if (userExists) return res.status(400).json({ message: 'Email déjà utilisé.' });
  
      const user = new userModel({ username, email, password });
      await user.save();
  
      res.status(201).json({ message: 'Utilisateur créé avec succès.' });
    } catch (err) {
      res.status(500).json({ message: 'Erreur serveur.', error: err.message });
    }
  });

// Route pour se connecter
authRouter.post('/login', async (req, res) => {
    try {
        const user = await userModel.findOne({ username: req.body.username });
        if (!user) {
            return res.status(401).json('Wrong credentials!');
        }
        const isPasswordCorrect = await user.matchPassword(req.body.password);
        if (!isPasswordCorrect) {
            return res.status(401).json('Wrong credentials!');
        }
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, secret, { expiresIn: '1h' });
        const { password, ...otherDetails } = user._doc;
        res.cookie('access_token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 60 * 60 * 1000),
        }).status(200).json({ ...otherDetails });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route pour se déconnecter
authRouter.get('/logout', (req, res) => {
    res.clearCookie('access_token').status(200).json('You are logged out!');
});

// Middleware pour vérifier le token
const verify = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).json('You are not authenticated!');
    }
    jwt.verify(token, secret, (err, user) => {
        if (err) {
            return res.status(403).json('Token is not valid!');
        }
        req.user = user;
        next();
    });
};

module.exports = authRouter;