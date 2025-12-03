const router = require('express').Router();

router.get('/', (req, res) => {
    res.send(' Ameiz school management API is active');
})


router.use('/students', require('./student'));



router.use('/teachers', require('./teachers'));

router.use('/', require('./swagger'));



module.exports = router;