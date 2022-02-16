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
        user_id:
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
        firstname: 
        { 
            type: Sequelize.STRING, 
            allowNull:false 
        },
    
        // Column-3, name
        name: 
        { 
            type: Sequelize.STRING, 
            allowNull:false 
        },
    
        // Column-4, email
        email: 
        { 
            type: Sequelize.STRING, 
            unique: true,
            allowNull:false 
        },

        // Column-5, user admin 
        isAdmin: 
        { 
            type: Sequelize.BOOLEAN, 
            defaultValue: false 
        },

        // Column-6, is active 
        isActive:  // à vérifier si utile rdx
        { 
            type: Sequelize.BOOLEAN, 
            defaultValue: false 
        },

        // Column-7, user picture
        imageUrl: 
        { 
            type: Sequelize.STRING     //  l'URL de l'image de l'utilisateur
        }, 
    
        // Column-8, default values for
        // dates => current time
        myDate:     // à vérifier si utile rdx
        { 
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW 
        },
  
        // Timestamps
        createDate: Sequelize.DATE, // à vérifier si utile rdx
        updateDate: Sequelize.DATE  // à vérifier si utile rdx
    })
  
    // Exporting User, using this constant
    // we can perform CRUD operations on
    // 'user' table.
    module.exports = User;  // à vérifier rdx
    // ou 
    //return User; à vérifier rdx
};