const express = require('express');
const bodyParser = require('body-parser');
const userRoute = require("./routes/userRoute");
const blogRoute = require("./routes/blogRoute")
const CONFIG = require('./config/config');


const app = express()

const PORT = CONFIG.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/user',userRoute)
app.use('/blog',blogRoute)

module.exports = server