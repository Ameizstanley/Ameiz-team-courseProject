// const express = require('express');
// const router = express.Router();
// const passport = require('../config/passport');

// /**
//  * @route GET /auth/github
//  * Initiates GitHub OAuth authentication
//  * Redirects user to GitHub login page
//  */

// router.get('/github',
//     passport.authenticate('github', {
//         scope: ['user:email']
//     })
// );

// /**
//  * @route GET /auth/github/callback
//  * GitHub redirects here after user authorizes
//  * Passport exchanges code for user profile
//  */
// router.get('/github/callback',
//     passport.authenticate('github', {
//         failureRedirect: '/auth/failure'
//     }),
//     (req, res) => {
//         // Successful authentication
//         res.redirect('/auth/success');
//     }
// );

// /**
//  * @route GET /auth/logout
//  * Logs the user out and ends the session
//  */
// router.get('/logout', (req, res) => {
//     req.logout(err => {
//         if (err) {
//             return res.status(500).json({error: 'Logout failed'});
//         }
//         res.json({message: 'Logged out successfully'});
//     });
// });

// /**
//  * Success Page
//  */
// router.get('/success', (req, res) => {
//     res.json({
//         message: 'Authentication successful',
//         user: req.user
//     });
// });

// /**
//  * Failure Page
//  */
// router.get('/failure', (req, res) => {
//     res.status(401).json({
//         error: 'Authentication failed'
//     });
// });

// module.exports = router;