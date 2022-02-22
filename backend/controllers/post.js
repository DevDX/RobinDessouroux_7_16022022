//const Post = require('../models/Thing'); // à adapter pour chaque model rdx

const fs = require('fs');
const db = require("../models");
const Post = db.post;

//console.log("ok passé ici post.js ligne 3");// test en dev

exports.createPost  = (req, res, next) => { 
  const postObject = JSON.parse(req.body.post);
  //delete req.body._id;
  delete postObject._id;
  const post = new Post({
    //...req.body,
	...postObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`  
  });
  post.save()
    .then(() => res.status(201).json({message: 'Objet enregistré !'})) 
    .catch(error => res.status(400).json({ error })); 
  // sequelize début
  Post.create({
      //postid serait créé automatiquement par l'auto incrément à vérifier rdx
      // req.params. ou req.body.  ?  à vérifier rdx
      postTitle : req.body.title,           
      postContent : req.body.content,
      postOwner : req.body.userid,
      postImageUrl : imageUrl  // déclaré en ligne 14 à vérifier rdx
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

  // Post.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
  Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
  //  sequelize début
  Post.update 
  (
    {
      postTitle : req.body.title,           
      postContent : req.body.content,
      postOwner : req.body.userid,
      postImageUrl : imageUrl
    },  
    {
      where: { _id: req.params.id }
    }
  ) 
  .then(() => res.status(200).json({ message: 'Objet sequelize modifié !'}))
  .catch(error => res.status(400).json({ error }));   
  //  sequelize fin 
};



exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
  .then(post => {
    const filename = post.imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => {
      Post.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
      // sequelize début
      Post.destroy({ where: { _id: req.params.id } })
      .then(() => res.status(200).json({ message: 'Objet sequelize supprimé !'}))
      .catch(error => res.status(400).json({ error }));
      // sequelize fin
      });
    })
  .catch(error => res.status(500).json({ error }));  
};



exports.getOnePost = (req, res, next) => {
      Post.findOne({ _id: req.params.id })
        .then((post) => { res.status(200).json(post);})
        .catch((error) => { res.status(404).json({ error: error });});
       // sequelize début  
       /* selon https://www.tabnine.com/code/javascript/functions/sequelize/Model/findOne */
       Post.findOne({ where: {_id: req.params.id } })   // à vérifier rdx
        .then((post) => { res.status(200).json(post);})
        .catch((error) => { res.status(404).json({ error: error });});
       // sequelize fin
};

  

exports.getAllPosts = (req, res, next) => {
  Post.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(400).json({
        error: error
      });
    });
  // sequelize début
  /* selon https://www.tabnine.com/code/javascript/functions/sequelize/Model/findAll */
  Post.findAll()  
    .then((post) => {
      res.status(200).json({post: 'Objets sequelize retrouvés !'}); 
    })
    .catch((error) => {
      res.status(400).json({
        error: error
      });
    });
  // sequelize fin    
};

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

