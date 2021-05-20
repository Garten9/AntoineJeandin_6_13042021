const mongoose = require('mongoose');
const sauce = require('../models/sauce');
const Sauce = require('../models/sauce');
const fs = require('fs');

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

exports.createSauce = (req, res, next) => {
  sauceObject = JSON.parse(req.body.sauce);
  // console.log(sauceObject);
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: []
  });
  sauce.id = sauce._id;
  //   console.log(sauce);
  sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistrée !' }))
    .catch(error => res.status(400).json({ error }));
  // .catch(error => console.log(error));

};

exports.modifySauce = (req, res, next) => {

  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
    .catch(error => res.status(400).json({ error }));

};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce supprimé !' }))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};


exports.likeSauce = (req, res, next) => {
  let userId = req.body.userId;
  let like = req.body.like;
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      let likes = sauce.likes;
      let dislikes = sauce.dislikes;
      let usersLiked = sauce.usersLiked;
      let usersDisliked = sauce.usersDisliked;

      if (like == 1 && usersLiked.indexOf(userId) == -1){
        usersLiked.push(userId);
        likes++;
      } else if (like == -1 && usersDisliked.indexOf(userId) == -1){
        usersDisliked.push(userId);
        dislikes++;
      } else if (like == 0) {
        let index = usersLiked.indexOf(userId);
        if (index != -1){
          usersLiked.splice(index, 1);
          likes--;
        } else {
          index = usersDisliked.indexOf(userId);
          usersDisliked.splice(index,1);
          dislikes--;
        }
      }

      Sauce.updateOne({ _id: req.params.id }, { likes: likes, dislikes: dislikes, usersLiked: usersLiked, usersDisliked: usersDisliked, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Sauce likes modifiés !' }))
      .catch(error => res.status(400).json({ error }));

    })
    .catch(error => res.status(500).json({ error }));
};
