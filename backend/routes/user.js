const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const password  = require('../middleware/password');
const multer = require('../middleware/multer-config');
const auth  = require('../middleware/auth'); // test 10/03/2022

router.post('/signup', password, userCtrl.signup);    //  inscription
router.post('/login', password, userCtrl.login);  //  connexion

router.get('/:id', password, userCtrl.getUser); // test rdx 24/02/2022
router.get('/profil/:id', password, userCtrl.getUser); // test rdx 24/02/2022
router.get('/profils/', userCtrl.getAllUser); // test rdx 24/02/2022 
router.delete('/profil/:id', auth, userCtrl.deleteUser); // suppression 
/* Attention pour la modification ! Ajouter multer à cause de l'image   */
router.put('/:id', password, multer, userCtrl.modifyUser);    //  modification

module.exports = router;    