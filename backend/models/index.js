const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD,  
    {
        host: dbConfig.HOST,
        //port: dbConfig.port,     
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

db.message.belongsTo(db.post,{onDelete:"CASCADE"});
db.post.hasMany(db.message);  

module.exports = db;