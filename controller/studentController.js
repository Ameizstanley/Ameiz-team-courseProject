const mongodb = require('../model/database');

const { ObjectId } = require('mongodb');

/**
 * student Controller
 * Author: Emeribe Ameiz
 */


const getAllStudents = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db('ameiz-team-project').collection('student').find();
        const students = await result.toArray();
        res.status(200).json(students);
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ 
            message: 'Error fetching students',
            error: error.message 
        });
    }
}


const getStudentById = async (req, res) => {
    try {
        const studentId = new ObjectId(req.params.id);
        const student = await mongodb.getDatabase().db('ameiz-team-project').collection('student').findOne({ _id: studentId });
        if (!student) {
            res.status(404).json({ message: 'Student not found' });
        }else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(student);
        }
    }catch (error) {
        console.error('Error fetching student by ID:', error);
        res.status(500).json({ 
            message: 'Error fetching student by ID',
            error: error.message 
        });
    }
}


const createStudent = async (req, res) => {
    try {
        const newCustomer = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            dateOfBirth: req.body.dateOfBirth,
            gradeLevel: req.body.gradeLevel,
            enrollmentDate: req.body.enrollmentDate,
            phoneNumber: req.body.phoneNumber

        };
        const result = await mongodb.getDatabase().db('ameiz-team-project').collection('student').insertOne(newCustomer);
        if (result.acknowledged) {
            res.status(201).json({message: 'Student created successfully', studentId: result.insertedId});
        }else {
            res.status(500).json({message: 'Failed to create student'});
        }

    }catch (error) {
        console.error('Error creating student:', error);
        res.status(500).json({ 
            message: 'Error creating student',
            error: error.message 
        });
    }
}


const updateStudent = async (req, res) => {
    try {
        const studentId = new ObjectId(req.params.id);
        const updatedStudent = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            dateOfBirth: req.body.dateOfBirth,
            gradeLevel: req.body.gradeLevel,
            enrollmentDate: req.body.enrollmentDate,
            phoneNumber: req.body.phoneNumber
            
    }
        const result = await mongodb.getDatabase().db('ameiz-team-project').collection('student').updateOne(
            { _id: studentId },
            { $set: updatedStudent }
        );

        if (result.matchedCount === 0) {
            res.status(404).json({ message: 'Student not found' });
        } else {
            res.status(200).json({ message: 'Student updated successfully' });
        }
}catch (error) {
        console.error('Error updating student:', error);
        res.status(500).json({ 
            message: 'Error updating student',
            error: error.message 
        });
    }
}

const deleteStudent = async (req, res) => {
    try {
        const studentId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db('ameiz-team-project').collection('student').deleteOne({ _id: studentId });
        if (result.deletedCount === 0) {
            res.status(404).json({ message: 'Student not found' });
        } else {
            res.status(200).json({ message: 'Student deleted successfully' });
        }
    }catch (error) {
        console.error('Error deleting student:' , error);
        res.status(500).json({ 
            message: 'Error deleting student',
            error: error.message 
        });
    }
}

module.exports = {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
}
