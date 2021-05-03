const Sauce = require('../models/sauce');

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
  };


exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
  };