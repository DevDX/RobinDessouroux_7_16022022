const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const password  = require('../middleware/password');

router.post('/signup', password, userCtrl.signup);    //  inscription
router.post('/login', password, userCtrl.login);  //  connexion
//router.get('/login', password, userCtrl.getUser); // test rdx 24/02/2022
router.get('/:id', password, userCtrl.getUser); // test rdx 24/02/2022
router.delete('/:id', password, userCtrl.deleteUser); // suppression 

module.exports = router;   