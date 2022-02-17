module.exports = (sequelize, Sequelize) => {
    // Define method takes two arguments
    // 1st - name of table
    // 2nd - columns inside the table
        const Message = sequelize.define('message', 
        {
      
            // Column-1, post_id is an object with 
            // properties like type, keys, 
            // validation of column.
            msg_id:
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
      
            // Column-2, link
            msgLink: 
            { 
                type: Sequelize.INTEGER, 
                allowNull:false 
            },
        
            // Column-3, content
            msgContent: 
            { 
                type: Sequelize.STRING, 
                allowNull:false 
            },
        
            // Column-4, owner
            msgOwner: 
            { 
                type: Sequelize.INTEGER, 
                unique: true,
                allowNull:false 
            },
    
            // Column-5, default values for
            // dates => current time
            msgdate:     // à vérifier si utile rdx
            { 
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW 
            },
      
            // Column-6, Timestamps
            msgUdate:   // à vérifier si utile rdx
            { 
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW 
            },
            // vérifier si correct rdx
        })
      
        // Exporting User, using this constant
        // we can perform CRUD operations on
        // 'user' table.
        module.exports = Message;  // à vérifier rdx
        // ou 
        //return Message; à vérifier rdx
    };