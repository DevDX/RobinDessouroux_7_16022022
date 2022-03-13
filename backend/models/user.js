
module.exports = (sequelize, Sequelize) => {

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
            required: true,
            allowNull:false 
        },

        // Column-6, user admin 
        uIsadmin: 
        { 
            type: Sequelize.BOOLEAN, 
            defaultValue: false 
        },

        // Column-7, is status active or not  
        uDeleted:   
        { 
            type: Sequelize.BOOLEAN, 
            defaultValue: false 
        },

        // Column-8, user picture
        uImageUrl: 
        { 
            type: Sequelize.STRING     //  l'URL de l'image de l'utilisateur
        }
    

    },
        // pour avoir le nom au singulier dans la DB
        {freezeTableName: true }     
    );
  

    
    
    return User; 
};

