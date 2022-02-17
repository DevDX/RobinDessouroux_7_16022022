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
        u_id:
        {
    
            // Sequelize module has INTEGER Data_Type.
            type:Sequelize.INTEGER,    
            // To increment user_id automatically.
            autoIncrement:true,    
            // user_id can not be null.
            allowNull:false,    
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
        uCdate:     // à vérifier si utile rdx
        { 
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW 
        },
  
        // Column-10, Timestamps
        uUdate:   // à vérifier si utile rdx
        { 
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW 
        },
    })
  
    // Exporting User, using this constant
    // we can perform CRUD operations on
    // 'user' table.
    module.exports = User;  // à vérifier rdx
    // ou 
    //return User; à vérifier rdx
};