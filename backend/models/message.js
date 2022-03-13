module.exports = (sequelize, Sequelize) => {
    // Define method takes two arguments
    // 1st - name of table
    // 2nd - columns inside the table
        const Message = sequelize.define('message', 
        {
      
            // Column-1, post_id is an object with 
            // properties like type, keys, 
            // validation of column.
            //message_id:
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
      
            
            // Column-2, content
            messageContent: 
            { 
                type: Sequelize.TEXT, 
                allowNull:false 
            },
        
            // Column-3, owner
            messageOwner: 
            { 
                type: Sequelize.STRING, 
                allowNull:false,
               
            },

          
           
        },

            // pour avoir le nom au singulier dans la DB
            {freezeTableName: true }    // test rdx 23/02/2022

        );
      
        return Message; //  à vérifier rdx
    };