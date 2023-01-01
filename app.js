const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./middleware/logging/logger');
const limiter = require('./middleware/rate.limit')
const helmet = require('helmet')
const userRoute = require("./routes/userRoute");
const blogRoute = require("./routes/blogRoute")
const CONFIG = require('./config/config');
const connectToDB = require("./db/dbConfig");
const cors = require('cors')


connectToDB()
require("./middleware/authorization")



const app = express()

app.use(helmet())
app.use(cors())
app.use(limiter)

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.use('/api', userRoute)
app.use('/api/blog', blogRoute)


app.get('/', (req, res) => {
    res.send("Welcome to Eddy Blog")
});

// Error handler middleware
app.use((error, req, res, next) => {
    console.error(error)
    const errorStatus = error.status || 500
    res.status(errorStatus).send(error.message)
    next()
})

app.listen(CONFIG.PORT, () => {
    logger.info(`Server is listening on port ${CONFIG.PORT}`)
});

// module.exports = app