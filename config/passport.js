const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

// Configure the GitHub OAuth Strategy
passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
    //This function will run after successful authentication
    //profile contains: id, username, displayName, email, etc
    return done(null, profile);
}));
//Only store the user ID in the session to keep it small
// Serialize user into the sessions
passport.serializeUser((user, done) => {
    done(null, user);
});

// Deserialize user from the sessions
// Happens on every request for authenticated users
passport.deserializeUser((obj, done) => {
    done(null, obj);
});

module.exports = passport;