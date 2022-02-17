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
            postOwner:                  // vérifier si  utile rdx  
            { 
                type: Sequelize.STRING, 
                unique: true,
                allowNull:false,
                /*references: 
                {
                    model: 'user',
                    key: 'u_id',
                    onDelete: 'CASCADE'
                } */
            },
    
            // Column-5, default values for
            // dates => current time
            /*postCdate:     // à vérifier si utile rdx
            { 
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW 
            },*/
      
            // Column-6, Timestamps
            /*postUdate:   // à vérifier si utile rdx
            { 
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW 
            },*/
            // vérifier si correct rdx
        })
      
        // Exporting User, using this constant
        // we can perform CRUD operations on
        // 'user' table.
        //module.exports = Post;  // à vérifier rdx
        // ou 
        return Post; // à vérifier rdx
    };