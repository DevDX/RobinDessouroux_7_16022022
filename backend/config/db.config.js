//require('dotenv').config();
const dotenv = require("dotenv").config({ encoding: "latin1" });


module.exports = {
    HOST: process.env.DB_HOST,
    //USER: "root",
    USER: process.env.DB_USER,
    //PASSWORD: "",
    PASSWORD: process.env.DB_PASS,
    //DB: "groupomaniadb",
    DB: process.env.DB_NAME,
    //port: 30000, à vérifier rdx
    //port: 3306,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };