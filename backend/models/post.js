module.exports = (sequelize, Sequelize) => {
    // Define method takes two arguments
    // 1st - name of table
    // 2nd - columns inside the table
        const Post = sequelize.define('post', 
        {
      
            // Column-1, post_id is an object with 
            // properties like type, keys, 
            // validation of column.
            /*Post_id */
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
      
            // Column-2, title
            postTitle: 
            { 
                type: Sequelize.STRING, 
                allowNull:false 
            },
        
            // Column-3, content
            postContent: 
            { 
                type: Sequelize.STRING, 
                allowNull:false 
            },
        
            // Column-4, owner
            //postOwner:                  // vérifier si  utile rdx  
            //{ 
                //type: Sequelize.STRING, 
                //type: Sequelize.INTEGER,
                //allowNull:false,
                /*references: 
                {
                    model: 'user',
                    key: 'u_id',
                    onDelete: 'CASCADE'
                } */
            //},
            // Column-5, post picture
            postImageUrl: 
            { 
                type: Sequelize.STRING     //  l'URL de l'image du post
            } 
            
            
        },

            // pour avoir le nom au singulier dans la DB
            {freezeTableName: true }    // test rdx 23/02/2022
        
        
        );

        
    
        return Post; // à vérifier rdx
    };

    