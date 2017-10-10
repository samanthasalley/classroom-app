'use strict';

const Sequelize   = require('sequelize'),
      path        = require('path'),
      env         = process.env.NODE_ENV || 'development',
      fs          = require('fs'),
      config      = require(path.join(__dirname, '..', 'config', 'config.json'))[env],
      db          = {};

let sequelize;
if(process.env.DATABASE_URL) sequelize = new Sequelize(process.env.DATABASE_URL, config);
else sequelize = new Sequelize(config.database, config.username, config.password, config);

console.log(sequelize);

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach(file => {
    let model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if('associate' in db[modelName]){
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;