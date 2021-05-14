const express = require("express");
const sessions = require("express-session");
const MongoStore = require("connect-mongo");
const logger = require("morgan");
const path = require("path");
const { connect } = require("mongoose");
const cors = require('cors')
const connectDB = require('./db/connect')
require("dotenv").config();
const User = require("./models/userModel");

const indexRouter = require("./routes/indexRouter");
const loggerRouter = require("./routes/loggerRouter")


const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())


app.use("/", indexRouter);
app.use("/logger" , loggerRouter)


const PORT = process.env.PORT || 2208;

// const SERVER_PORT = 8080
app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
  connectDB()
})

module.exports = app;