const mongodb = require('../model/database');

const { ObjectId} = require('mongodb');


const getAllParents = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db('ameiz-team-project').collection('parent').find();
        const parents = await result.toArray();
        res.status(200).json( parents)
    }catch (error) {
        console.error('error fetching parents:');
        res.status(500).json({
            message: 'Error fetching parents',
            error: error.message
        });
 }   }


 const getStudentById = async (req, res) => {
    try {
        const parentId = new ObjectId(req.params.id);
        const parent = await mongodb.getDatabase().db('ameiz-team-project').collection('parent').findOne({ _id: parentId });
        if (!parent) {
            res.status(404).json({ message: 'Parent not found' });
        }else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(parent);
        }
    }catch (error) {
        console.error('Error fetching parent by ID:')
        res.status(500).json({
            message: 'Error fetching parent by ID',
            error: error.message
        });
    }
 }


 const createParent = async (req, res) => {
    try {
        const newParent = {
            parent_name: req.body.parent_name,
            gender: req.body.gender,
            email: req.body.email,
            phone: req.body.phone,
            occupation: req.body.occupation,
            relationship_to_student: req.body.relationship_to_student,
            children_names: Array.isArray(req.body.children_names) ? req.body.children_names : [req.body.children_names],
            children_grades: Array.isArray(req.body.children_grades) ? req.body.children_grades : [req.body.children_grades]
        }

        const result = await mongodb.getDatabase().db('ameiz-team-project').collection('parent').insertOne(newParent);
        if (result.acknowledged){
            res.status(201).json({message: 'Parent successfully created', parentId: result.insertedId})
        }else {
            res.status(500).json({message: 'Failed to create parent'})
        }

    }catch (error){
        console.error('Error creating parent:', error);
        res.status(500).json({
            message: 'Error creating parent',
            error: error.message
        });
    }
 }


 const updateParent = async (req, res) => {
    try {
        const updatedParent = {
            parent_name: req.body.parent_name,
            gender: req.body.gender,
            email: req.body.email,
            phone: req.body.phone,
            occupation: req.body.occupation,
            relationship_to_student: req.body.relationship_to_student,
            children_names: Array.isArray(req.body.children_names) ? req.body.children_names : [req.body.children_names],
            children_grades: Array.isArray(req.body.children_grades) ? req.body.children_grades : [req.body.children_grades]

        }

        const result = await mongodb.getDatabase().db('ameiz-team-project').collection('parent').updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: updatedParent }
        );

        if (result.matchedCount === 0) {
            res.status(404).json({message: 'Parent not found'});
        }else{
            res.status(200).json({message: 'Parent successfully updated'});
        }
    } catch (error) {
        console.error('Error updating parent:', error);
        res.status(500).json({
            message: 'Error updating parent',
            error: error.message
        });
    }
 }


const deleteParent = async (req, res) => {
    try {
        const parentId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db('ameiz-team-project').collection('parent').deleteOne({ _id: parentId });
        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'Parent successfully deleted' });
        } else {
            res.status(404).json({ message: 'Parent not found' });
        }
    }catch (error) {
        console.error('Error deleting parent:', error);
        res.status(500).json({
            message: 'Error deleting parent',
            error: error.message
        });
    }
}

module.exports = {
    getAllParents,
    getStudentById,
    createParent,
    updateParent,
    deleteParent
}