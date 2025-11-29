const router = require('express').Router();

router.get('/', (req, res) => {
    res.send(' Ameiz school management API is active');
})


router.use('/students', require('./student'));

router.use('/studymaterials', require('./studymaterials'));

router.use('/teachers', require('./teachers'));



module.exports = router;