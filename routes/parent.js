const express = require('express');
const router = express.Router();
const parentController = require('../controller/parentsController');
const parentValidation = require('../utilities/parentValidation');



router.get('/',
    async (req, res) => {
        try{
            await parentController.getAllParents(req, res)
        }catch (error) {
            res.status(500).json({
                message: 'Error retrieving parents',
                error: error.message
            });
        }
    }
)


router.get('/:id',
    async (req, res) => {
        try{
            await parentController.getParentById(req, res)
        }catch (error) {
            res.status(500).json({
                message: 'Error retrieving parent by ID',
                error: error.message
            })
        }
    }
)


router.post('/',
    parentValidation.createParentRules(),
    parentValidation.checkCreateParents,
    async (req, res) => {
        try{
            await parentController.createParent(req, res)
        }catch (error) {
            res.status(500).json({
                message: 'Error creating parent',
                error: error.message
            })
        }
    }
)



router.put('/:id',
    parentValidation.updateParentRules(),
    parentValidation.checkUpdateParents, 
    async (req, res) => {
        try{
            await parentController.updateParent(req, res)
        }catch(error) {
            res.status(500).json({
                message: 'Error updating parent',
                error: error.message
            })
        }
    }
)

router.delete('/:id',
    async (req, res) => {
        try{
            await parentController.deleteParent(req, res)
        }catch (error) {
            res.status(500).json({
                message: 'Error deleting parent',
                error: error.message
            })
        }
    }
)


module.exports = router;