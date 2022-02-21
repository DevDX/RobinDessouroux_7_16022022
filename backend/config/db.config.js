module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "groupomaniadb",
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