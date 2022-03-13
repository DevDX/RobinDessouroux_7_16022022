const express = require('express');
const router = express.Router();

const messageCtrl = require('../controllers/message');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, messageCtrl.createMessage);  //  création 
//router.post('/',  multer, messageCtrl.createMessage);  //  création 
router.put('/:id', auth, multer, messageCtrl.modifyMessage);    //  modification
router.get('/:id', auth, messageCtrl.getOneMessage);    //  afficher un message
router.delete('/:id', auth, messageCtrl.deleteMessage); // suppression 

router.post('/:id/like', auth, messageCtrl.likeDislike);   //cas des likes et dislikes à conserver ou pas ?  

module.exports = router;  