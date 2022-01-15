OAuth is an open standard for access delegation, commonly used as a way for Internet users to grant websites or applications access to their information on other websites but without giving them the passwords.

authorization tokens to prove an identity between consumers and service providers

able to acccess information from 3rd part website


//https://www.passportjs.org/docs/
//https://www.passportjs.org/packages/passport-google-oauth20/

//jshint esversion:6

require('dotenv').config();

const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

const app = express();

app.use(express.static('public')); 
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');  
app.use(session({
    secret:'Our little secret.',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost:27017/userDB', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex',true);

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    googleId: String        //we only get and save the googleId but not username or password
  });

userSchema.plugin(passportLocalMongoose);   //pass and salt to user
userSchema.plugin(findOrCreate); 
  
const User = new mongoose.model('User', userSchema);

passport.use(User.createStrategy());

// use static serialize and deserialize of model for passport session support
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
  //not only for local

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.get('/', function(req, res){ 
    res.render('home');
});  

app.get("/auth/google",
  passport.authenticate('google', { scope: ["profile"] })
);  //use passport to authenticate out google, pop-up for google profile

app.get("/auth/google/secrets", //same as the one we used on Google
  passport.authenticate('google', { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect to secrets.
    res.redirect("/secrets");
  });
 

app.get('/login', function(req, res){ 
    res.render('login');
});  

app.get('/register', function(req, res){ 
    res.render('register');
});  

app.get("/logout", function(req, res){
    req.logout();       //cookie gets deleted when we restart our server, we have to login again.
    res.redirect("/");
});

app.post('/register', function(req, res){ 
    User.register({username: req.body.username}, req.body.password, function(err, user){
        if (err) {
            console.log(err);
            res.redirect('/register');
        } else {
            passport.authenticate('local')(req, res, function(){
                res.redirect('/secrets');       //send cookie
            })
        }
    })
});  

app.get('/secrets', function(req, res){     //cookie remembers the username and password
    if (req.isAuthenticated()) {
        res.render('secrets');
    } else {
        res.redirect('/login');
    }
});

app.post("/login", function(req, res){

    const user = new User({
      username: req.body.username,
      password: req.body.password
    });
  
    req.login(user, function(err){
      if (err) {
        console.log(err);
      } else {
        passport.authenticate("local")(req, res, function(){
          res.redirect("/secrets");
        });
      }
    });
  
  });

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});
