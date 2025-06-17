//Requirements

const express = require("express");
const mongodb = require("./data/database.js");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require('express-session');
const GithubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

//App creation
const app = express();
const port = process.env.PORT || 3000;

//Middleware
app.use(express.static("public"));
app.use(bodyParser.json());

//oauth2.0 setup
app
  .use(session({
          secret: 'secret',
          resave: false,
          saveUninitialized: true,
      }))

      .use(passport.initialize())
      .use(passport.session())

      .use((req, res, next) => {
          res.setHeader('Access-Controll-Allow-Origin', '*');
          res.setHeader(
              'Access-Control-Allow-Headers', 
              'Origin, X-Requested-With, Content-Type, Accept, Z-key, Authorization'
          );
          res.setHeader(
              'Access-Control-Allow-Methods', 
              'GET, POST, PUT, DELETE, OPTIONS');
          next();
      })

      .use(cors({ methods: ['GET', 'POST','PUT', 'DELETE', 'UPDATE', 'PATCH'] }))
      .use(cors({ origin: '*' }))

      
passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
}, 
function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : 'Logged out')});

app.get('/auth/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false}), 
    (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
});


//Routes
app.use("/", require("./routes/index"));

//Database connection
mongodb.initDb((err) => {
  if (err) {
    console.error("Failed to connect to the database:", err);
    return;
  } else {
    console.log("Database connection established successfully.");
    // Start the server only after successful database connection
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  }
});
