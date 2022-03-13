const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const db = require("../models");
const User = db.user;
const fs = require('fs');
 
//const Post = db.post;   // test rdx 26/02/2022

//let idAdmin = 0; // variable de W id de l'admin 27/02/2022  à vérifier rdx

/* partie joi pour email */
const Joi = require('joi'); 

/* début test qui est Admin 27/02/2022 rdx */
/*exports.getAdmin = (req,res,next) => {
    User.findOne({ uIsadmin: 1 })    
        .then(user => {
            if(!user) {
                return res.status(401).json({ error : 'ADMIN sequelize non trouvé !' });
            }
            else
            {
                //idAdmin = user.id;
                idAdmin = ('id', { where: { uIsadmin:  1 }  }); // Quel est l'Admin ?
            }
            console.log(user.id);
            console.log(user.uIsadmin);
            //console.log(req.body.uPassword);
            console.log(user.uPassword);
            bcrypt.compare(req.body.uPassword, user.uPassword)
            
            .catch(error => res.status(500).json({ error }));
        })
    }*/  
    
 //   console.log("idAdmin : " + idAdmin);     
/*  fin test qui est Admin 27/02/2022 rdx                                 */

// version stackoverflow
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
else {
      //console.log(value);
      //res.send("email ok selon stackoverflow");
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
                                        // sequelize début 
                                        /*User.create(
                                            {
                                                //usertid serait créé automatiquement par l'auto incrément à vérifier rdx
                                                // req.params. ou req.body.  ?  à vérifier rdx
                                                uFirstname : req.body.uFirstname,           // utile ?  à vérifier rdx
                                                uName:  req.body.uName,
                                                //uEmail: req.body.uEmail,
                                                uEmail: req.body.uEmail,
                                                //uPassword: req.body.uPassword,
                                                uPassword: hash,
                                                uIsadmin: req.body.uIsadmin,
                                                uDeleted: false,
                                                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` ,
                                                uImageUrl : imageUrl 
                                            })
                                          .then(() => res.status(201).json({message: 'USER sequelize créé !'})) 
                                          .catch(error => res.status(400).json({ error })); */
                                        // sequelize fin
                            })
                        .catch(error => res.status(500).json({ error }));      
    }
};
// Joi fin 


exports.login = (req, res, next) => {
    //User.findOne({ uEmail: req.body.uEmail })    
    User.findOne({ where: {uEmail: req.body.uEmail} })   
    .then(user => {
        /*if(!user) {
            return res.status(401).json({ error : 'Utilisateur non trouvé !' });
        }*/
        console.log("id dans table user : "+user.id);
        console.log("email dans table : " +user.uEmail);
        console.log("email reçu : " +req.body.uEmail);
        console.log(req.body.uPassword);
        console.log(user.uPassword);
        bcrypt.compare(req.body.uPassword, user.uPassword)
        .then(valid => {
            if (!valid) {
                return res.status(401).json({ error : 'Mot de passe incorrect !' });   
            }
            res.status(200).json({
                /*userId: user._id,*/
                userData: user,
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
    /*.catch(error => res.status(500).json({ error }));*/
    /*.catch(error => { console.log("Utilisateur non trouvé !");  }); 09/03/2022 */
    .catch(error => res.status(500).json({ error: 'Utilisateur sequelize non trouvé' }))
    /*if(!user) {
        return res.status(401).json({ error : 'Utilisateur non trouvé !' });
    };*/

}; 

// début sequelize retrieve données utilisateur
exports.getUser = (req, res,next) => 
{
    //User.findOne({ where: { id: req.params.id } }) // à vérifier rdx si suffisant, si la sélection des champs est implicite ou bien à ajouter 
    User.findByPk( req.params.id  )
    .then((user) => res.status(200).json({ user: req.params.id }) )   
    .catch(error => res.status(404).json({ error: 'Utilisateur sequelize non trouvé' }))
};
// fin sequelize données utilisateur

// début suppression utilisateur
exports.deleteUser = (req, res, next) => 
{
    /*User.findOne( { where: { _id: req.params.id } })*/
    User.findByPk( req.params.id  )
    .then(user => 
        {       
            {
              User.destroy({ where: { id: req.params.id } }) // à vérifier rdx
              //.then(() => res.status(200).json({ message: 'Objet sequelize supprimé !'}))
              .then(() => res.status(200).json({ message: 'User sequelize supprimé !'}))
              //.then( console.log("User sequelize id "+ req.params.id + " supprimé. Vérifiez la table post, champ userId !")) 
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
  
    // User.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
    /*User.updateOne({ _id: req.params.id }, { ...userObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'User modifié !'}))
      .catch(error => res.status(400).json({ error }));*/
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
    console.log("test");
    User
      .findAll()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving users.",
        });
      });
  };
