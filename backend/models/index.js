/* index.js selon https://www.bezkoder.com/node-js-express-sequelize-mysql/ */
const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, // dbConfig.port à vérifier si utile ou pas rdx
    {
        host: dbConfig.HOST,
        //port: dbConfig.port,    // à vérifier rdx
        dialect: dbConfig.dialect,
        //operatorsAliases: false,

        pool:   
        {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    })
    

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// selon le site db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.user = require("./user.js")(sequelize, Sequelize);
db.message = require("./message.js")(sequelize, Sequelize);
db.post = require("./post.js")(sequelize, Sequelize);


db.post.belongsTo(db.user);
db.user.hasMany(db.post);  
// début test 26/02/2022 rdx 
//db.user.hasMany(db.post,{ onDelete: "CASCADE", hooks: true });  
// fin test 26/02/2022 rdx

db.message.belongsTo(db.post,{onDelete:"CASCADE"});
db.post.hasMany(db.message);  

module.exports = db;