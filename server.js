require('dotenv').config();
const express = require('express');
const mongodb = require('./model/database');
const dotenv = require('dotenv');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const GithubStrategy = require('passport-github2').Strategy;


const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));


app.use(session({
         secret: 'secret',
         resave: false,
         saveUninitialized: true,

   }));


app.use(passport.initialize());
app.use(passport.session());


app
   .use(cors({methods: ['GET', 'POST', 'PUT', 'DELETE', 'UPDATE', 'PATCH'], origin: '*'}))
   .use(cors({origin: '*'}));

 passport.use(new GithubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL || process.env.callbackURL
    },
    function(acessToken, refreshToken, profile, done) {
        //User.findOrCreate({ githubId: profile.id }, function (err, user) {
            return done(null, profile);
        //});
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
})

app.get('/', (req, res) => {res.send (req.session.user !== undefined ? `logged in as ${req.session.user.displayName}` : 'logged out')});


app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
});





app.use('/', require('./routes'))



//start server


mongodb.initDb((err) => {
    if (err) {
        console.error('failed to initialize database:', err);
        process.exit(1);
    }

    app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});
});

