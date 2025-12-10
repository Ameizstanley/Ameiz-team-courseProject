const express = require('express');
const router = express.Router();


/**
 * student route
 * Author: Emeribe Ameiz
 */

const studentController = require('../controller/studentController');
const studentValidation = require('../utilities/studentValidation');

const { isAuthenticated } = require('../utilities/authenticate')

router.get('/',
    async (req, res) =>{
        try {
            await studentController.getAllStudents(req, res)
        }catch (error) {
            res.status(500).json({
                message: 'Error retrieving students',
                error: error.message
            })
        }
    }
     );

router.get('/:id',
    async (req, res) => {
        try{
            await studentController.getStudentById(req, res)
        }catch (error) {
            res.status(500).json({
                message: 'Error retrieving student by ID',
                error: error.message
            })
        }
    } );


router.post('/',
    // isAuthenticated,
    studentValidation.createStudentRules(),
    studentValidation.createStudentValidation,
    async (req, res) => {
        try{
            await studentController.createStudent(req, res)
        }catch (error) {
            res.status(500).json({
                message: 'Error creating student',
                error: error.message
            })
        }
    }
);


router.put('/:id',
    // isAuthenticated,
    studentValidation.updateStudentRules(),
    studentValidation.updateStudentValidation,
    async (req, res) => {
        try{
            await studentController.updateStudent(req, res)
        }catch (error) {
            res.status(500).json({
                message: 'Error updating student',
                error: error.message
            })
        }
    }
);


router.delete('/:id',
    // isAuthenticated,
    async (req, res) => {
        try{
            await studentController.deleteStudent(req, res)
        }catch (error) {
            res.status(500).json({
                message: 'Error deleting student',
                error: error.message
            })
        }
    }
);



module.exports = router;