const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

// defining the port number
const port = 8000;

// Including layouts to the file
const expressLayouts = require("express-ejs-layouts");

//  Used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const MongoStore = require("connect-mongo")(session);
const sassMiddleware = require("node-sass-middleware");

app.use(
  sassMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    debud: true,
    outputStyle: "extended",
    prefix: "/css",
  })
);

// Including database
const db = require("./config/mongoose");

// reading through post request
app.use(express.urlencoded());
app.use(cookieParser());

// Using expressLayouts
app.use(expressLayouts);

// Including or using assets files
app.use(express.static("./assets"));

// Extract style and scripts from sub pages into layouts
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
app.set("layout extractImages", true);
app.set("layout extractFonts", true);

// Set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(
  session({
    name: "Codeial",
    // TODO: change secret as a key before deployment in production mode
    secret: "something",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new MongoStore(
      {
        mongooseConnection: db,
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// Use express router
app.use("/", require("./routes/index"));

// Connecting to server
app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
    return;
  }
  console.log(`Server is running on the port: ${port}`);
});
