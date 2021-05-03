const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Sauce = require('./models/sauce');
const Utilisateur = require('./models/utilisateur');
const sauceRoutes = require('./routes/sauces');

const app = express();

mongoose.connect('mongodb+srv://admin:admin@bddsopepeckocko.aak5o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// definit les headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());
// permet d'extraire les données json
app.use(express.json());

app.use('/api/sauces', sauceRoutes);

module.exports = app;