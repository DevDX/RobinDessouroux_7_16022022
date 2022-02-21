/* index.js selon https://www.bezkoder.com/node-js-express-sequelize-mysql/ */
const dbConfig = require("../config/db.config.js");

const fs = require('fs');
const path = require('path');

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, // dbConfig.port à vérifier si utile ou pas rdx
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool:   
        {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    });

    /* pas clair du tout pour moi. Exemple de https://github.com/PierreGambarotto/tuto_sequelize/blob/master/lib/models/index.js */
    fs
        .readdirSync(__dirname)
        .filter(function(file) {
            return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
        })
        .forEach(function(file) {
            var model = sequelize['import'](path.join(__dirname, file));
            db[model.name] = model;
        });

        Object.keys(db).forEach(function(modelName) {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
        });  
        
    /* pas clair pour moi. Exemple de https://github.com/PierreGambarotto/tuto_sequelize/blob/master/lib/models/index.js */

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// selon le site db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.user = require("./user.js")(sequelize, Sequelize);
db.message = require("./message.js")(sequelize, Sequelize);
db.post = require("./comment.js")(sequelize, Sequelize);

// vérifier si ce qui suit est juste rdx
db.user.hasMany(db.post,{onDelete: "CASCADE", foreignKey: 'userid'}); // à vérifier si bonne syntaxe rdx
db.user.hasMany(db.message,{onDelete: "CASCADE", foreignKey: 'userid'}); // à vérifier si bonne syntaxe rdx

db.post.belongsTo(db.user);
db.message.belongsTo(db.user);

db.post.hasMany(db.message,{onDelete: "CASCADE", foreignKey: 'postid'}); // à vérifier si bonne syntaxe rdx
db.message.belongsTo(db.post);

module.exports = db;