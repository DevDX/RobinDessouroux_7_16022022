/* https://fr.acervolima.com/node-js-mysql-creer-une-table-a-l-aide-de-sequelize/*/

// Include Sequelize module.
//const Sequelize = require('sequelize')
  
// Import sequelize object, 
// Database connection pool managed by Sequelize.
//const sequelize = require('../utils/database')

module.exports = (sequelize, Sequelize) => {
// Define method takes two arguments
// 1st - name of table
// 2nd - columns inside the table
    const User = sequelize.define('user', 
    {
  
        // Column-1, user_id is an object with 
        // properties like type, keys, 
        // validation of column.
        //u_id:
        id:
        {
    
            // Sequelize module has INTEGER Data_Type.
            type:Sequelize.INTEGER,    
            // To increment user_id automatically.
            autoIncrement:true,    
            // user_id can not be null.
            //allowNull:false,    
            // For uniquely identify user.
            primaryKey:true
        },
  
        // Column-2, name
        uFirstname: 
        { 
            type: Sequelize.STRING, 
            allowNull:false 
        },
    
        // Column-3, name
        uName: 
        { 
            type: Sequelize.STRING, 
            allowNull:false 
        },
    
        // Column-4, email
        uEmail: 
        { 
            type: Sequelize.STRING, 
            unique: true,
            allowNull:false 
        },

        // Column-5, password
        uPassword: 
        {
            type: Sequelize.STRING,
            required: true
        },

        // Column-6, user admin 
        uIsadmin: 
        { 
            type: Sequelize.BOOLEAN, 
            defaultValue: false 
        },

        // Column-7, is status active or not  
        uDeleted:  // à vérifier si utile rdx
        { 
            type: Sequelize.BOOLEAN, 
            defaultValue: false 
        },

        // Column-8, user picture
        uImageUrl: 
        { 
            type: Sequelize.STRING     //  l'URL de l'image de l'utilisateur
        }, 
    
        // Column-9, default values for
        // dates => current time
        /*uCdate:     // à vérifier si utile rdx
        { 
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW 
        },*/
  
        // Column-10, Timestamps
        /*uUdate:   // à vérifier si utile rdx
        { 
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW 
        },*/
        
        // timestamps auto
        timestamps: true,
        // to keep the same name in the DB. Here user. à vérifier rdx
        freezeTableName: true        
    })
  
    //sequelize.sync({ alter: true }) // à vérifier rdx
    /*
    Cela vérifie quel est l'état actuel de la table dans la base de données (quelles colonnes elle contient, 
    quels sont leurs types de données, etc.), 
    puis effectue les modifications nécessaires dans la table pour la faire correspondre au modèle.
    */
    // crée la table à chaque fois à vérifier rdx
    //sequelize.sync({force:true})

    // This creates the table if it doesn't exist (and does nothing if it already exists) http://sequelize.org/master/manual/model-basics.html
    User.sync();
    
    /*
    User.hasMany(post, 
        {
            foreignKey: 'u_id',
            onDelete:   'CASCADE',
            onUpdate:   'CASCADE',
        })*/

    // Exporting User, using this constant
    // we can perform CRUD operations on
    // 'user' table.
    //module.exports = User;  // à vérifier rdx
    // ou 
    return User; //à vérifier rdx selon vidéo youtube 
};

//export default user;