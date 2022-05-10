var Sequelize = require('sequelize');

var data = "elclubgr_pruebascris";
var user = "elclubgr_pruebascris";
var password = "Cocacola2020*";
var host = "162.241.60.255";

const database = new Sequelize(
  data, // name database
  user, // user database
  password, // password database
  {
    host: host,
    dialect: 'mysql' // mariadb / sqlite / postgres
  }
);

database.sync()

module.exports = database;