const fs = require('fs');
const db = require("../models");
const Message = db.message;

exports.createMessage  = (req, res, next) => {   
  // sequelize début
  Message.create({
      messageContent : req.body.messageContent,
      messageOwner : req.body.messageOwner,  
      postId : req.body.postId      
    })
    .then(() => res.status(201).json({message: 'Message sequelize enregistré !'})) 
    .catch(error => res.status(400).json( error )); 
  // sequelize sequelize fin   
};
  
exports.modifyMessage = (req, res, next) => {
  // cas particulier SI NOUVELLE IMAGE alors enlever la précédente - - - - -
  if (req.file) {
    Message.findOne({ _id: req.params.id }).then((message) => {
      const filename = message.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, (err) => {
        if (err) console.log(err);
        else {
          console.log('image précédente retirée ' + filename);
        }
      });
    });
  }
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const messageObject = req.file ?
    {
      ...JSON.parse(req.body.message),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };  

  //  sequelize début
  Message.update 
  (
   {
      messageLink : req.body.messageLink,           
      messageContent : req.body.messageContent,
      messageImageUrl : req.body.messageImageUrl
    },  
    {
      where: { id: req.params.id  }  
    } 
    
  ) 
  .then(() => res.status(200).json({ message: 'Objet sequelize modifié !' }))
  .catch(error => res.status(400).json({ error }));   
  //  sequelize fin 
};


exports.deleteMessage = (req, res, next) => 
{
  Message.findOne({ _id: req.params.id })
  .then(message => 
    {
        if(message.imageUrl)
        {
            const filename = message.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => 
            {
                Message.destroy({ where: { id: req.params.id } })  
                .then(() => res.status(200).json({ message: 'Objet sequelize supprimé !'}))
                .catch(error => res.status(400).json({ error }));
            });   
        }
        else
        {
            Message.destroy({ where: { id: req.params.id } })  
            .then(() => res.status(200).json({ message: 'Objet sequelize supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        }      
   })
  .catch(error => res.status(500).json({ error : "ligne 87 de controllers/message.js" }));   
};



exports.getOneMessage = (req, res, next) => {
       // sequelize début  
       Message.findByPk( req.params.id  )   // find by personnal key 
       .then((message) => { res.status(200).json(message);})
       .catch((error) => { res.status(404).json({ error: error });});
       // sequelize fin
};

/* Attention, pas utilisé pour l'instant !!! rdx */
// cas des likes et dislikes
exports.likeDislike = (req, res, next) => { 
  
  switch (req.body.like) {

    // case 1 pour like
    case 1:
      Message.updateOne(
        { _id: req.params.id },
        { $push: { usersLiked: req.body.userId }, // $push ajoute une valeur spécifiée à un tableau
          $inc: { likes: +1 } // $inc incrémente un champ d'une valeur spécifiée 
        })
        .then(() => res.status(200).json({ message: 'like +1' }))
        .catch((error) => res.status(400).json({ error }));
      break;

    // case -1 pour dislike
    case -1:
      Message.updateOne(
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
      Message.findOne({ _id: req.params.id })
        .then((message) => {
          if (message.usersLiked.includes(req.body.userId)) { // ici l'utilisateur avait aimé 
            Message.updateOne(
              { _id: req.params.id },
              { $pull: { usersLiked: req.body.userId }, // $push ajoute une valeur spécifiée à un tableau
                $inc: { likes: -1 } // $inc incrémente un champ d'une valeur spécifiée
              })
              .then(() =>
                res.status(200).json({ message: 'suppression du like' })
              )
              .catch((error) => res.status(400).json({ error }));
          }
          if (message.usersDisliked.includes(req.body.userId)) {  // ici l'utilisateur n'avait pas aimé 
            Message.updateOne(
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
 
