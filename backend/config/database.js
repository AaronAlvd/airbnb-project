// backend/config/database.js
const config = require('./index');
require('dotenv').config();
// const path = require('path');



module.exports = {
  development: {
    storage: config.dbFile,
    dialect: "sqlite",
    seederStorage: "sequelize",
    logQueryParameters: true,
    typeValidation: true
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    seederStorage: 'sequelize',
    // seederStoragePath: path.resolve(__dirname, '../db/seeders'), 
    seederStorageTableName: 'SequelizeData', 

    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: console.log,
    define: {
      schema: process.env.SCHEMA
    }
  }
};
