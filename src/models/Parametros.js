//import sequelize
var Sequelize = require('sequelize');
// importing connection database
var database = require('./database');

var Parametros = database.define('parametros', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: Sequelize.STRING,
    value: Sequelize.STRING
  });
  
  module.exports = Parametros