const express = require('express');

const router = express.Router();

const sauceCtrl = require('../controllers/sauces');



router.get('/', sauceCtrl.getAllSauces);
router.get('/:id', sauceCtrl.getOneSauce );




module.exports = router;