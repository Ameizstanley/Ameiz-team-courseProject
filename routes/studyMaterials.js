const express = require('express');
const router = express.Router();
const studyMaterialsController = require('../controller/studyMaterialsController');
const studyMaterialValidation = require('../utilities/studyMaterial');

router.get('/',
    async (req, res) => {
        try{
            await studyMaterialsController.getAllStudyMaterials(req, res)
        }catch (error) {
            res.status(500).json({
                message: 'Error retrieving study materials',
                error: error.message
            });
        }
    }
)


router.get('/:id',
    async (req, res) => {
        try{
            await studyMaterialsController.getStudyMaterialById(req, res)
        }catch (error) {
            res.status(500).json({
                message: 'Error retrieving study material by ID',
                error: error.message
            })
        }
    }
)


router.post('/', 
     studyMaterialValidation.createStudyMaterialRules(),
     studyMaterialValidation.checkCreateStudyMaterial,
    async (req, res) => {
        try{
            await studyMaterialsController.createStudyMaterial(req, res)
        }catch (error) {
            res.status(500).json({
                message: 'Error creating study material',
                error: error.message
            })
        }
    }
)


router.put('/:id', 
    studyMaterialValidation.updateStudyMaterialRules(),
    studyMaterialValidation.checkUpdateStudyMaterial,
    async (req, res) => {
        try{
            await studyMaterialsController.updateStudyMaterial(req, res)
        }catch (error) {
            res.status(500).json({
                message: 'Error updating study material',
                error: error.message
            })
        }
    }
)


router.delete('/:id',
    async (req, res) => {
        try{
            await studyMaterialsController.deleteStudyMaterial(req, res)
        }catch (error) {
            res.status(500).json({
                message: 'Error deleting study material',
                error: error.message
            })
        }
    }
)



module.exports = router;