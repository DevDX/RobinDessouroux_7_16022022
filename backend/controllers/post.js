const fs = require('fs');
const { user } = require('../models');
const db = require("../models");
const Post = db.post;
const Message = db.message;


exports.createPost  = (req, res, next) => {   
  // sequelize début
  console.log(req.body);
  Post.create({
      postTitle : req.body.postTitle,           
      postContent : req.body.postContent,
      postOwner : req.body.postOwner,
      userId: req.body.userId,
      //postImageUrl :   `${req.protocol}://${req.get('host')}/images/${req.file.filename}`  
      postImageUrl : ""
    })
    .then(() => res.status(201).json({message: 'Objet sequelize enregistré !'})) 
    .catch(error => res.status(400).json({ error })); 
  // sequelize sequelize fin   
};
  
exports.modifyPost = (req, res, next) => {
  // cas particulier SI NOUVELLE IMAGE alors enlever la précédente - - - - -
  if (req.file) {
    Post.findOne({ _id: req.params.id }).then((post) => {
      const filename = post.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, (err) => {
        if (err) console.log(err);
        else {
          console.log('image précédente retirée ' + filename);
        }
      });
    });
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const postObject = req.file ?
    {
      ...JSON.parse(req.body.post),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };  

  //  sequelize début
  Post.update 
  (
   {
      postTitle : req.body.postTitle,           
      postContent : req.body.postContent,
      //postOwner : req.body.postOwner, // userid ou postOwner
      //imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      postImageUrl : req.body.postImageUrl,  // ou imageUrl
    },  
    {
      where: { id: req.params.id  }  
    } 
    
  ) 
  .then(() => res.status(200).json({ message: 'Objet sequelize modifié !' }))
  .catch(error => res.status(400).json({ error }));   
  //  sequelize fin 
};



exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
  .then(post => {
        if(post.imageUrl)
        {
            const filename = post.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => 
            {
                Post.destroy({ where: { id: req.params.id } })  
                .then(() => res.status(200).json({ message: 'Objet sequelize supprimé !'}))
                .catch(error => res.status(400).json({ error }));
            });   
        }
        else
        {
            Post.destroy({ where: { id: req.params.id } })  
            .then(() => res.status(200).json({ message: 'Objet sequelize supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        }      
   })
  .catch(error => res.status(500).json({ error : "ligne 92 de controllers/post.js" }));   
};



exports.getOnePost = (req, res, next) => {
       // sequelize début  
       Post.findByPk( req.params.id  )   // find by personnal key 
        .then((post) => { res.status(200).json(post);})
        .catch((error) => { res.status(404).json({ error: error });});
       // sequelize fin
};

  

exports.getAllPosts = (req, res, next) => {
  // sequelize début
  /* selon https://www.tabnine.com/code/javascript/functions/sequelize/Model/findAll */
  Post.findAll({attributes: 
    ['id',
     `postTitle` ,
     `postContent` ,
     `postOwner` ,
     `postImageUrl` ,
     `createdAt` ,
     `updatedAt`,
     `userId` 
   ], include: Message })  
    .then((posts) => {
      res.status(200).json( posts ); 
    })
    .catch((error) => {
      res.status(400).json({
        error: error
      });
    });
  // sequelize fin    
};


/* Attention, pas utilisé pour l'instant !!! rdx */
// cas des likes et dislikes
exports.likeDislike = (req, res, next) => { 
  
  switch (req.body.like) {

    // case 1 pour like
    case 1:
      Post.updateOne(
        { _id: req.params.id },
        { $push: { usersLiked: req.body.userId }, // $push ajoute une valeur spécifiée à un tableau
          $inc: { likes: +1 } // $inc incrémente un champ d'une valeur spécifiée 
        })
        .then(() => res.status(200).json({ message: 'like +1' }))
        .catch((error) => res.status(400).json({ error }));
      break;

    // case -1 pour dislike
    case -1:
      Post.updateOne(
        { _id: req.params.id },
        { $push: { usersDisliked: req.body.userId },  // $push ajoute une valeur spécifiée à un tableau
          $inc: { dislikes: +1 } // $inc incrémente un champ d'une valeur spécifiée 
        })
        .then(() => {
          res.status(200).json({ message: 'dislike +1' }) 
        })
        .catch((error) => res.status(400).json({ error }));
      break;

    // case 0 décrémentation du like ou du dislike
    case 0:
      Post.findOne({ _id: req.params.id })
        .then((post) => {
          if (post.usersLiked.includes(req.body.userId)) { // ici l'utilisateur avait aimé 
            Post.updateOne(
              { _id: req.params.id },
              { $pull: { usersLiked: req.body.userId }, // $push ajoute une valeur spécifiée à un tableau
                $inc: { likes: -1 } // $inc incrémente un champ d'une valeur spécifiée
              })
              .then(() =>
                res.status(200).json({ message: 'suppression du like' })
              )
              .catch((error) => res.status(400).json({ error }));
          }
          if (post.usersDisliked.includes(req.body.userId)) {  // ici l'utilisateur n'avait pas aimé 
            Post.updateOne(
              { _id: req.params.id },
              {
                $pull: { usersDisliked: req.body.userId },  // $push ajoute une valeur spécifiée à un tableau
                $inc: { dislikes: -1 }, // $inc incrémente un champ d'une valeur spécifiée
              })
              .then(() =>
                res.status(200).json({ message: 'suppression du dislike' })
              )
              .catch((error) => res.status(400).json({ error }));
          }
        })
        .catch((error) => res.status(404).json({ error }));
      break;

    

    default:
      console.log(error); // vérifier si impératif, présent dans la doc mdn rdx
  }
};

