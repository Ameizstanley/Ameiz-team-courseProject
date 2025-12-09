const express = require('express');
const router = express.Router();
const teacherController = require('../controller/teacherController');
const teacherValidation = require('../utilities/teachersValidation');
const { ensureAuthenticated } = require('../utilities/authMiddleware');



router.get('/', 
    async (req, res) => {
        try{
            await teacherController.getAllTeachers(req, res)
        } catch (error) {
            res.status(500).json({
                message: 'Error retrieving teachers',
                error: error.message
            });
        }
    });


router.get('/:id',
    async (req, res) => {
        try{
            await teacherController.getTeacherById(req, res)
        }catch (error) {
            res.status(500).json({
                message: 'Error retrieving teacher by ID',
                error: error.message
            })
        }
    }
);


router.post('/',
    ensureAuthenticated,
    teacherValidation.createTeacherRules(),
    teacherValidation.checkCreateTeacher,
    async (req, res) => {
        try{
            await teacherController.createTeacher(req, res)
        }catch (error) {
            res.status(500).json({
                message: 'Error creating teacher',
                error: error.message
            })
        }
    }
);


router.put('/:id', 
    ensureAuthenticated,
    teacherValidation.updateTeacherRules(),
    teacherValidation.checkUpdateTeacher,
    async (req, res) => {
        try{
            await teacherController.updateTeacher(req, res)
        }catch (error) {
            res.status(500).json({
                message: 'Error updating teacher',
                error: error.message
            })
        }
    }
);

router.delete('/:id', 
    ensureAuthenticated,
    async (req, res) => {
        try{
            await teacherController.deleteTeacher(req, res)
        }catch (error) {
            res.status(500).json({
                message: 'Error deleting teacher',
                error: error.message
            })
        }
    }
);

module.exports = router;