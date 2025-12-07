const router = require('express').Router();

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


module.exports = router;