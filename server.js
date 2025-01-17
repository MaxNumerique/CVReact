const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');


dotenv.config();
const app = express();


// Connexion à MongoDB
mongoose
.connect(process.env.URI)
.then(() => console.log('MongoDB connecté'))
.catch((err) => console.error(err));

// Configuration
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Serveur en cours sur le port ${PORT} à l'url : http://localhost:${PORT}`));

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.send('API en ligne');
});

// Route Experience
const experienceRoutes = require('./routes/experienceRoute');
app.use('/', experienceRoutes);

//Route Language
const languageRoutes = require('./routes/languageRoute');
app.use('/', languageRoutes);

//Route Project
const projectRoutes = require('./routes/projectRoute');
app.use('/', projectRoutes);

//Route Hobbie
const hobbieRoute = require('./routes/hobbieRoute');
app.use('/', hobbieRoute);

//Route Formation
const formationRoute = require('./routes/formationRoute');
app.use('/', formationRoute);

//Route Information
const informationRoute = require('./routes/informationRoute');
app.use('/', informationRoute);

//Route Skill
const skillRoute = require('./routes/skillRoute');
app.use('/', skillRoute);

//Route User
const userRoute = require('./routes/userRoute');
app.use('/', userRoute);

//Route Auth
const authRoute = require('./routes/authRoute');
app.use('/auth', authRoute);

module.exports = app;