const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const password  = require('../middleware/password');
const multer = require('../middleware/multer-config');
const auth  = require('../middleware/auth'); 

router.post('/signup', password, userCtrl.signup);    //  inscription
router.post('/login', password, userCtrl.login);  //  connexion
router.get('/users/profil', userCtrl.getAllUser);  
router.get('/:id', password, userCtrl.getUser);  
router.get('/profil/:id', password, userCtrl.getUser);  


router.delete('/profil/:id', auth, userCtrl.deleteUser); // suppression 
/* Attention pour la modification ! Ajouter multer à cause de l'image   */
router.put('/:id', password, multer, userCtrl.modifyUser);    //  modification

module.exports = router;    