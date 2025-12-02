/**
 * Teacher Controller
 * Author: Johnathan Babb
 */

const mongodb = require('../model/database');
const { ObjectId } = require('mongodb');

/**
 * Get all teachers
 */
const getAllTeachers = async (req, res) => {
    try {
        const db = mongodb.getDatabase().db('ameizSchool');
        const teachers = await db.collection('teachers').find().toArray();
        
        res.status(200).json(teachers);
    } catch (error) {
        console.error('Error fetching teachers:', error);
        res.status(500).json({ 
            message: 'Error fetching teachers',
            error: error.message 
        });
    }
};

/**
 * Get teacher by ID
 */
const getTeacherById = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Validate ObjectId format
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ 
                message: 'Invalid teacher ID format' 
            });
        }

        const db = mongodb.getDatabase().db('ameizSchool');
        const teacher = await db.collection('teachers').findOne({ 
            _id: new ObjectId(id) 
        });

        if (!teacher) {
            return res.status(404).json({ 
                message: 'Teacher not found' 
            });
        }

        res.status(200).json(teacher);
    } catch (error) {
        console.error('Error fetching teacher:', error);
        res.status(500).json({ 
            message: 'Error fetching teacher',
            error: error.message 
        });
    }
};

/**
 * Create a new teacher
 */
const createTeacher = async (req, res) => {
    try {
        const { firstName, lastName, email, subject, department } = req.body;

        // Basic validation
        if (!firstName || !lastName || !email) {
            return res.status(400).json({ 
                message: 'firstName, lastName, and email are required fields' 
            });
        }

        const db = mongodb.getDatabase().db('ameizSchool');
        
        // Check if email already exists
        const existingTeacher = await db.collection('teachers').findOne({ email });
        if (existingTeacher) {
            return res.status(400).json({ 
                message: 'A teacher with this email already exists' 
            });
        }

        const newTeacher = {
            firstName,
            lastName,
            email,
            subject: subject || null,
            department: department || null,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const result = await db.collection('teachers').insertOne(newTeacher);

        if (result.acknowledged) {
            const createdTeacher = await db.collection('teachers').findOne({ 
                _id: result.insertedId 
            });
            res.status(201).json(createdTeacher);
        } else {
            res.status(500).json({ 
                message: 'Failed to create teacher' 
            });
        }
    } catch (error) {
        console.error('Error creating teacher:', error);
        res.status(500).json({ 
            message: 'Error creating teacher',
            error: error.message 
        });
    }
};

/**
 * Update a teacher
 */
const updateTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, subject, department } = req.body;

        // Validate ObjectId format
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ 
                message: 'Invalid teacher ID format' 
            });
        }

        // Check if at least one field is provided
        if (!firstName && !lastName && !email && !subject && !department) {
            return res.status(400).json({ 
                message: 'At least one field must be provided for update' 
            });
        }

        const db = mongodb.getDatabase().db('ameizSchool');

        // Check if teacher exists
        const existingTeacher = await db.collection('teachers').findOne({ 
            _id: new ObjectId(id) 
        });

        if (!existingTeacher) {
            return res.status(404).json({ 
                message: 'Teacher not found' 
            });
        }

        // If email is being updated, check it's not already in use by another teacher
        if (email && email !== existingTeacher.email) {
            const emailInUse = await db.collection('teachers').findOne({ 
                email,
                _id: { $ne: new ObjectId(id) }
            });
            
            if (emailInUse) {
                return res.status(400).json({ 
                    message: 'Email is already in use by another teacher' 
                });
            }
        }

        // Build update object with only provided fields
        const updateData = {
            updatedAt: new Date()
        };

        if (firstName) updateData.firstName = firstName;
        if (lastName) updateData.lastName = lastName;
        if (email) updateData.email = email;
        if (subject !== undefined) updateData.subject = subject;
        if (department !== undefined) updateData.department = department;

        const result = await db.collection('teachers').updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        );

        if (result.modifiedCount > 0) {
            const updatedTeacher = await db.collection('teachers').findOne({ 
                _id: new ObjectId(id) 
            });
            res.status(200).json(updatedTeacher);
        } else {
            res.status(200).json({ 
                message: 'No changes were made',
                teacher: existingTeacher 
            });
        }
    } catch (error) {
        console.error('Error updating teacher:', error);
        res.status(500).json({ 
            message: 'Error updating teacher',
            error: error.message 
        });
    }
};

/**
 * Delete a teacher
 */
const deleteTeacher = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ObjectId format
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ 
                message: 'Invalid teacher ID format' 
            });
        }

        const db = mongodb.getDatabase().db('ameizSchool');

        // Check if teacher exists
        const existingTeacher = await db.collection('teachers').findOne({ 
            _id: new ObjectId(id) 
        });

        if (!existingTeacher) {
            return res.status(404).json({ 
                message: 'Teacher not found' 
            });
        }

        const result = await db.collection('teachers').deleteOne({ 
            _id: new ObjectId(id) 
        });

        if (result.deletedCount > 0) {
            res.status(200).json({ 
                message: 'Teacher deleted successfully',
                deletedTeacher: existingTeacher 
            });
        } else {
            res.status(500).json({ 
                message: 'Failed to delete teacher' 
            });
        }
    } catch (error) {
        console.error('Error deleting teacher:', error);
        res.status(500).json({ 
            message: 'Error deleting teacher',
            error: error.message 
        });
    }
};

module.exports = {
    getAllTeachers,
    getTeacherById,
    createTeacher,
    updateTeacher,
    deleteTeacher
};
