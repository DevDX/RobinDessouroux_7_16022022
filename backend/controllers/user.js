const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const db = require("../models");
const User = db.user;
const fs = require('fs');

/* partie joi pour email */
const Joi = require('joi'); 

exports.signup = (req, res, next) => {
    const schema = Joi.object().keys({
        uEmail: Joi.string().regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).required(),//.error(new Error('email incorrect !')),
        uPassword: Joi.string().required(),
        uFirstname: Joi.string().required(),
        uName: Joi.string().required(),
        uIsadmin: Joi.boolean().required()
    })
      
    // const { value, error } = schema.validate(req.body);
    if(schema.validate(req.body).error){return res.status(500).json(schema.validate(req.body).error.details); }
    else 
    {
        bcrypt.hash(req.body.uPassword, 10)
            .then(hash => 
                {
                    const user = new User(
                        {
                            uEmail: req.body.uEmail,
                            uPassword: hash,
                            uFirstname: req.body.uFirstname,
                            uName: req.body.uName,
                            uIsadmin: req.body.uIsadmin
                        });
                        user.save()
                        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                        .catch(error => res.status(400).json({ error }));                                        
                })
            .catch(error => res.status(500).json({ error }));      
    }
};
// Joi fin 


exports.login = (req, res, next) => {
    User.findOne({ where: {uEmail: req.body.uEmail} })   
    .then(user => {
        /* console.log("id dans table user : "+user.id); console.log("email dans table : " +user.uEmail); console.log("email reçu : " +req.body.uEmail); console.log(req.body.uPassword); console.log(user.uPassword);*/
        bcrypt.compare(req.body.uPassword, user.uPassword)
        .then(valid => {
            if (!valid) {
                return res.status(401).json({ error : 'Mot de passe incorrect !' });   
            }
            res.status(200).json({
                userData: user,
                //token: 'TOKEN' remplacé par la fonction sign
                token: jwt.sign(
                    { userId: user._id },
                    'RANDOM_TOKEN_SECRET',  
                    { expiresIn: '24h' }             
                )
            });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error: 'Utilisateur sequelize non trouvé' }))
}; 

// début sequelize retrieve données utilisateur
exports.getUser = (req, res,next) => 
{
    User.findByPk( req.params.id  )
    .then((user) => res.status(200).json({ user: req.params.id }) )   
    .catch(error => res.status(404).json({ error: 'Utilisateur sequelize non trouvé' }))
};
// fin sequelize données utilisateur

// début suppression utilisateur
exports.deleteUser = (req, res, next) => 
{
    User.findByPk( req.params.id  )
    .then(user => 
        {       
            {
              User.destroy({ where: { id: req.params.id } }) 
              .then(() => res.status(200).json({ message: 'User sequelize supprimé !'}))
              .catch(error => res.status(400).json({ error }));
            } 
        })
    //.catch(error => res.status(500).json({ error : "ligne 126 de controllers/user.js" }));   
    //.catch(error => {console.log("erreur 500 ligne 160 controllers/user.js :" + error +" "+req.params.id ) });   
    .catch(err => {console.log(err) });  
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
   
    //  sequelize début
    User.update 
    (
        {
            uFirstname : req.body.uFirstname,           
            uName:  req.body.uName,
            //uEmail: req.body.uEmail,
            //uPassword: req.body.uPassword,
            //uPassword: hash,
            uIsadmin: req.body.uIsadmin,
            uDeleted: req.body.uDeleted,
            //imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` ,
            //postImageUrl : imageUrl  à ajouter après rdx  25/02/2022
        },  
        {
            where: { id: req.params.id }
        }
    ) 
    .then(() => res.status(200).json({ message: 'User sequelize modifié !'}))
    .catch(error => res.status(400).json({ error }));   
    //  sequelize fin 
};
// fin modification données utilisateur

exports.getAllUser = (req, res) => {
    User.findAll()
    .then((data) => 
    {
        res.send(data);
    })
    .catch((err) => 
    {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving users.",
        });
    });
};
