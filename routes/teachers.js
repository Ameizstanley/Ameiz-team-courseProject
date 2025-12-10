const express = require('express');
const router = express.Router();
const teacherController = require('../controller/teacherController');
const teacherValidation = require('../utilities/teachersValidation');



const { isAuthenticated } = require('../utilities/authenticate')


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
    isAuthenticated,
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
    isAuthenticated,
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
    isAuthenticated,
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