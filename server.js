const express = require("express"); // to handle our CRUD api
const app = express(); // storing express in the app variable
const mongoose = require("mongoose"); // build model and help to talk to database
const passport = require("passport"); // so we can do the authentication
const session = require("express-session"); // so we can keep the users logged in
const MongoStore = require("connect-mongo")(session); // passing our session to the database so if the server restart we can always get back to the logged in user
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database"); // connecting to the database - using mongoDB
// the Routes will see the request and handle that request to a specifc controler
const mainRoutes = require("./routes/main");
const todoRoutes = require("./routes/todos");

require("dotenv").config({ path: "./config/.env" }); // so we can use the environment variable

// Passport config
require("./config/passport")(passport); // syntax to pull in the passport for authentication

connectDB(); // invoking the function that connects to the database

app.set("view engine", "ejs"); //
app.use(express.static("public")); // grab all of our static files. So we ont have to make individual routes for static files in the public folder to communicate with each other.
app.use(express.urlencoded({ extended: true })); // - ennable us to look in the data that was sent from the form---- replaces bodyParser()
app.use(express.json()); // - ennable us to look in the data that was sent from the form---- replaces bodyParser()
app.use(logger("dev"));

// Sessions
// keep our sessions so the logged in user stays logged in as we move throughout the pages
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    // MongoStore so that our session is stored in the database and not in memory running on our server
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware  -- setting up the middleware - actually starting the sessions
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use("/", mainRoutes); // here is the request of our router - whenever there is a request to the main route '/' the mainRoutes router file will handle that request!!!
app.use("/todos", todoRoutes); // when the get is to the /todos route, todoRoutes file will handle it

app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
