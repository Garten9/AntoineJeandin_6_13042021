const mongoose = require('mongoose');

const utilisateurSchema = mongoose.Schema({
  userId: { type: String, unique: true, required: true},
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true}
});

module.exports = mongoose.model('Utilisateur', utilisateurSchema);