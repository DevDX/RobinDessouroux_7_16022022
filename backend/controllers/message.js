//const Message = require('../models/Thing'); // à adapter pour chaque model rdx
const Message = require('../models/message'); // à adapter pour chaque model rdx
const fs = require('fs');
 


exports.createMessage  = (req, res, next) => { 
  const messageObject = JSON.parse(req.body.message);
  //delete req.body._id;
  delete messageObject._id;
  const message = new Message({
    //...req.body,
	...messageObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`  
  });
  message.save()
    .then(() => res.status(201).json({message: 'Objet enregistré !'})) 
    .catch(error => res.status(400).json({ error })); 
  // sequelize début
  Message.create({
      //messageid serait créé automatiquement par l'auto incrément à vérifier rdx
      // req.params. ou req.body.  ?  à vérifier rdx
      messageTitle : req.body.title,           
      messageContent : req.body.content,
      messageOwner : req.body.userid,
      messageImageUrl : imageUrl  // déclaré en ligne 14 à vérifier rdx
    })
    .then(() => res.status(201).json({message: 'Objet sequelize enregistré !'})) 
    .catch(error => res.status(400).json({ error })); 
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

  // Message.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
  Message.updateOne({ _id: req.params.id }, { ...messageObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
  //  sequelize début
  Message.update 
  (
    {
      messageTitle : req.body.title,           
      messageContent : req.body.content,
      messageOwner : req.body.userid,
      messageImageUrl : imageUrl
    },  
    {
      where: { _id: req.params.id }
    }
  ) 
  .then(() => res.status(200).json({ message: 'Objet sequelize modifié !'}))
  .catch(error => res.status(400).json({ error }));   
  //  sequelize fin 
};



exports.deleteMessage = (req, res, next) => {
  Message.findOne({ _id: req.params.id })
  .then(message => {
    const filename = message.imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => {
      Message.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
      // sequelize début suppression message
      Message.destroy({ where: { _id: req.params.id } })
      .then(() => res.status(200).json({ message: 'Objet sequelize supprimé !'}))
      .catch(error => res.status(400).json({ error }));
      // sequelize fin suppression message
      });
    })
  .catch(error => res.status(500).json({ error }));  
};



exports.getOneMessage = (req, res, next) => {
      Message.findOne({ _id: req.params.id })
        .then((message) => { res.status(200).json(message);})
        .catch((error) => { res.status(404).json({ error: error });});
       // sequelize début  
       /* selon https://www.tabnine.com/code/javascript/functions/sequelize/Model/findOne */
       Message.findOne({ where: {_id: req.params.id } })   // à vérifier rdx
        .then((message) => { res.status(200).json(message);})
        .catch((error) => { res.status(404).json({ error: error });});
       // sequelize fin
};

  

exports.getAllMessages = (req, res, next) => {
  Message.find()
    .then((messages) => {
      res.status(200).json(messages);
    })
    .catch((error) => {
      res.status(400).json({
        error: error
      });
    });
  // sequelize début
  /* selon https://www.tabnine.com/code/javascript/functions/sequelize/Model/findAll */
  Message.findAllMessages()  
    .then((messages) => {
      res.status(200).json({messages: 'Objets sequelize retrouvés !'}); 
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

