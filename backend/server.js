/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const mongodb = require('./data/database');

const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;
app.use(bodyParser.json());
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true
}))

//express session init
app.use(passport.initialize())

//init passport on every route call
app.use(passport.session())


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT']}))
app.use(cors({ origin: '*'}))

app.use('/', require('./routes'));

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
))

passport.serializeUser((user, done) => {
  done(null,user)
});
passport.deserializeUser((user, done) => {
  done(null,user)
});

app.get('/', (req, res) => {
  res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : 'Logged Out' )
});

app.get('/github/callback', passport.authenticate('github', {
  failureRedirect: 'api-docs', session: false }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  });

mongodb.intDb((err) => {
  if (err) {
    console.error(err);
  } else {
    app.listen(port, () => { console.warn(`Database is listening and Node is running on port ${port}`); });
  }
});