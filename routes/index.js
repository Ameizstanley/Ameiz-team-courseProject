const router = require('express').Router();

let passport;
try {
    passport = require('passport');
} catch (err) {
    passport = null;
}

router.get('/', (req, res) => {
    res.send(' Ameiz school management API is active');
})


router.use('/students', require('./student'));



router.use('/teachers', require('./teachers'));

router.use('/', require('./swagger'));

router.use('/study-materials', require('./studyMaterials'));

router.use('/parents', require('./parent'));

router.get('/health', (req, res) => {
    res.send('Health is very good')
})


if (passport) {
    router.get('/login', passport.authenticate('github', { scope: ['user:email'] }), (req, res) => {});

    router.get('/logout', function (req, res, next) {
        req.logout(function (err) {
            if (err) { return next(err); }
            res.redirect('/');
        });
    });
} else {
    // Passport not installed/configured — provide placeholder handlers to avoid crashes
    router.get('/login', (req, res) => res.status(501).json({ message: 'Login not configured' }));
    router.get('/logout', (req, res) => res.status(501).json({ message: 'Logout not configured' }));
}



module.exports = router;