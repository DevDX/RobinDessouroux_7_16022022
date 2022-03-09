const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const password  = require('../middleware/password');
const multer = require('../middleware/multer-config');

router.post('/signup', password, userCtrl.signup);    //  inscription
router.post('/login', password, userCtrl.login);  //  connexion
//router.get('/login', password, userCtrl.getUser); // test rdx 24/02/2022
router.get('/:id', password, userCtrl.getUser); // test rdx 24/02/2022
router.get('/profil/:id', password, userCtrl.getUser); // test rdx 24/02/2022
//router.get('/:uIsadmin', userCtrl.getAdmin); // test rdx 27/02/2022
/*router.delete('/:id', password, userCtrl.deleteUser); // suppression */
/*router.delete('/profil/:id', password, userCtrl.deleteUser); // suppression test 09/03/2022 */
router.delete('/profil/:id', userCtrl.deleteUser); // suppression 
/* Attention pour la modification ! Ajouter multer à cause de l'image   */
router.put('/:id', password, multer, userCtrl.modifyUser);    //  modification

module.exports = router;   