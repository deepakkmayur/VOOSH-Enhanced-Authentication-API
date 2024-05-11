

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const env=require("../env")
// Replace these values with your Google OAuth credentials
const GOOGLE_CLIENT_ID = env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = env.GOOGLE_CLIENT_SECRET;
const CALLBACK_URL = env.callbackURL; // Update with your callback URL

// Configure the Google OAuth strategy
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: CALLBACK_URL
  },
  (accessToken, refreshToken, profile, done) => {
   
    return done(null, profile); 
  }
));


passport.serializeUser((user, done) => {
  done(null, user);
});


passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
