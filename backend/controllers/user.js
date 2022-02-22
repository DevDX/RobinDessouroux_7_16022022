const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const db = require("../models");
const User = db.user;
const fs = require('fs');


/* partie joi pour email */
const Joi = require('joi'); 


// version stackoverflow
exports.signup = (req, res, next) => {
    const schema = Joi.object().keys({
        email: Joi.string().regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).required(),//.error(new Error('email incorrect !')),
        password: Joi.string().required()
    })
      
// const { value, error } = schema.validate(req.body);
if(schema.validate(req.body).error){ res.send(schema.validate(req.body).error.details); }
else {
      //console.log(value);
      //res.send("email ok selon stackoverflow");
      bcrypt.hash(req.body.password, 10)
                        .then(hash => 
                            {
                                        const user = new User(
                                            {
                                                email: req.body.email,
                                                password: hash
                                            });
                                        user.save()
                                        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                                        .catch(error => res.status(400).json({ error }));
                                        // sequelize début 
                                        User.create(
                                            {
                                                //usertid serait créé automatiquement par l'auto incrément à vérifier rdx
                                                // req.params. ou req.body.  ?  à vérifier rdx
                                                uFirstname : req.body.uFirstname,           // utile ?  à vérifier rdx
                                                uName:  req.body.uName,
                                                //uEmail: req.body.uEmail,
                                                uEmail: req.body.email,
                                                //uPassword: req.body.uPassword,
                                                uPassword: hash,
                                                uIsadmin: req.body.uIsadmin,
                                                uDeleted: false,
                                                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` ,
                                                postImageUrl : imageUrl 
                                            })
                                          .then(() => res.status(201).json({message: 'USER sequelize créé !'})) 
                                          .catch(error => res.status(400).json({ error })); 
                                        // sequelize fin
                            })
                        .catch(error => res.status(500).json({ error }));      
    }
};
// Joi fin 


exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if(!user) {
            return res.status(401).json({ error : 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid) {
                return res.status(401).json({ error : 'Mot de passe incorrect !' });   
            }
            res.status(200).json({
                userId: user._id,
                //token: 'TOKEN' remplacé par la fonction sign
                token: jwt.sign(
                    { userId: user._id },
                    'RANDOM_TOKEN_SECRET', // <= écran ou cours => RANDOM_SECRET_KEY ? 
                    { expiresIn: '24h' }
                )
            });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));

}; 

// début sequelize retrieve données utilisateur
exports.getUser = (req, res,next) => 
{
    User.findOne({ where: { _id: req.params.id } }) // à vérifier rdx si suffisant, si la sélection des champs est implicite ou bien à ajouter 
    .then((user) => res.status(200).json({user}) )   
    .catch(error => res.status(404).json({ error: 'Utilisateur sequelize non trouvé' }))
};
// fin sequelize données utilisateur

// début suppression utilisateur
exports.deleteUser = (req, res, next) => {
    User.findOne({ _id: req.params.id })
    .then(user => 
        {
            const filename = user.imageUrl.split('/images/')[1];    // suppression de l'image si elle existe
            fs.unlink(`images/${filename}`, () => {
                User.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Image supprimée !'}))
                .catch(error => res.status(400).json({ error }));
                });
            // début sequelize suppression utilisateur    
            User.destroy({ where: { _id: req.params.id } })  
            .then(() => res.status(200).json({ message: 'Utilisateur sequelize supprimé !'}))
            .catch(error => res.status(400).json({ error }));  
            // fin sequelize suppression utilisateur
        })
    .catch(error => res.status(500).json({ error }));  
  };
// fin suppression utilisateur

// début modification données utilisateur
exports.modifyUser = (req, res, next) => {
    // cas particulier SI NOUVELLE IMAGE alors enlever la précédente - - - - -
    if (req.file) {
      User.findOne({ _id: req.params.id }).then((user) => {
        const filename = user.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, (err) => {
          if (err) console.log(err);
          else {
            console.log('image précédente du User retirée ' + filename);
          }
        });
      });
    }
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      const userObject = req.file ?
      {
        ...JSON.parse(req.body.user),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };  
  
    // User.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
    User.updateOne({ _id: req.params.id }, { ...userObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'User modifié !'}))
      .catch(error => res.status(400).json({ error }));
    //  sequelize début
    User.update 
    (
        {
            uFirstname : req.body.uFirstname,           // utile ?  à vérifier rdx
            uName:  req.body.uName,
            //uEmail: req.body.uEmail,
            //uEmail: req.body.email,
            //uPassword: req.body.uPassword,
            //uPassword: hash,
            uIsadmin: req.body.uIsadmin,
            uDeleted: req.body.uDeleted,
            //imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` ,
            postImageUrl : imageUrl 
        },  
        {
            where: { _id: req.params.id }
        }
    ) 
    .then(() => res.status(200).json({ message: 'User sequelize modifié !'}))
    .catch(error => res.status(400).json({ error }));   
    //  sequelize fin 
  };
  
  
// fin modification données utilisateur

