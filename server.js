// BE Test
// Version 1.0.0
// Created by Rehananto - 081295955149

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
//const cookieParser = require("cookie-parser");
const passport = require("passport");
//const globalErrorHandler = require("./controllers/errorController");
const config = require("./config");

const userrouter = require("./routes/user");

// database connection
mongoose.connect(config.dbUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    // useCreateIndex: true,   //tdk bisa di atlas
    // useFindAndModify: false,
  });

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", async () => {
  console.log("DB Connected");
});
app.use(cors());

//passport authentication
app.use(passport.initialize());
require("./passportconfig")(passport);

//app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/v1/user", userrouter);
//app.use(globalErrorHandler);
//server start
app.listen(config.port, () => console.log(`Server is running on port ${config.port}.`));

