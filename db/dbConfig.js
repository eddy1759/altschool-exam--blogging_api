const mongoose = require('mongoose');
const CONFIG = require('../config/config');
const logger = require('../middleware/logging/logger')


function connectToDataBase() {
    mongoose.connect(CONFIG.MONGODB_URL)

    mongoose.connection.on("connected", () => {
        logger.info('Database connected successfully')
    })

    mongoose.connection.on("error", (err) => {
        logger.info('An error occurred while trying to connect to database')
        logger.error(err)
    })
};


module.exports = connectToDataBase