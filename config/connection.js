const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

    if (process.env.JAWSDB_URL) {
        sequelize = new Sequelize(process.env.JAWSDB_URL);
    } else {
        console.log(`connecting to db ${process.env.DB_NAME} with user${process.env.DB_USER} and password ${process.env.DB_PASS}`)
        sequelize = new Sequelize(
            process.env.DB_NAME,
            process.env.DB_USER,
            process.env.DB_PASSWORD,
            {
                host: 'localhost',
                dialect: 'mysql',
                port: 3306
            }
        );
    }
        
module.exports = sequelize;