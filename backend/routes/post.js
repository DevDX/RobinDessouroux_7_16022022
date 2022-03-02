const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, postCtrl.createPost);  //  création 
router.put('/:id', auth, multer, postCtrl.modifyPost);    //  modification
router.put('/:userId', auth, multer, postCtrl.modifyPost);    //  modification
router.get('/:id', auth, postCtrl.getOnePost);    //  afficher un post
router.get('/', auth, postCtrl.getAllPosts);  // afficher tous les posts
router.delete('/:id', auth, postCtrl.deletePost); // suppression 

router.post('/:id/like', auth, postCtrl.likeDislike);   //cas des likes et dislikes à conserver ou pas ? rdx

module.exports = router;  