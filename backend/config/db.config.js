require('dotenv').config();

module.exports = {
    HOST: "localhost",
    //USER: "root",
    USER: process.env.DB_USER,
    //PASSWORD: "",
    PASSWORD: process.env.DB_PASS,
    //DB: "groupomaniadb",
    DB: process.env.DB_HOST,
    //port: 30000, à vérifier rdx
    port: 30000,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };