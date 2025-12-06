const mongodb = require('../model/database');

const { ObjectId } = require('mongodb');

const getAllStudyMaterials = async (req, res) => {
    try{
        const result = await mongodb.getDatabase().db('ameiz-team-project').collection('study-material').find();
        const studyMaterials = await result.toArray();
        res.status(200).json({
            message: 'Study materials retrieved successfully',
            data: studyMaterials
        })
    }catch (error) {
        console.error('Error fetching study materials:', error);
        res.status(500).json({
            message: 'Error fetching study materials',
            error: error.message
        });
    }
}


const getStudyMaterialById = async (req, res) => {
    try{
        const studyMaterialId = new ObjectId(req.params.id);
        const studyMaterial = await mongodb.getDatabase().db('ameiz-team-project').collection('study-material').findOne({ _id: studyMaterialId });
        if (!studyMaterial) {
            res.status(404).json({message: 'Study material not found'});
        }else{
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(studyMaterial);
        }
    }catch (error) {
        console.error('Error fetching study material by ID:', error);
        res.status(500).json({
            message: 'Error fetching study material by ID',
            error: error.message
        });
    }
}



const createStudyMaterial = async (req, res) => {
    try{
        const newStudyMaterial = {
            title : req.body.title,
            subject : req.body.subject,
            gradeLevel : req.body.gradeLevel,
            description : req.body.description,
            teacherName : req.body.teacherName,
            tags : req.body.tags,
            isActive: req.body.isActive
    }

    const result = await mongodb.getDatabase().db('ameiz-team-project').collection('study-material').insertOne(newStudyMaterial);
    if (result.acknowledged){
        res.status(201).json({message: 'study materials succesfully created',studyMaterialId: result.insertedId})
    }else {
        res.status(500).json({message: 'Failed to create study material'})
    }
}catch (error) {
    console.error('Error creating study material:', error);
    res.status(500).json({
        message: 'Error creating study material',
        error: error.message
    });
}
  }


  const updateStudyMaterial = async (req, res) => {
    try{
        const updateStudyMaterial = {
            title : req.body.title,
            subject : req.body.subject,
            gradeLevel : req.body.gradeLevel,
            description : req.body.description,
            teacherName : req.body.teacherName,
            tags : [].req.body.tags,
            isActive: req.body.isActive
        }

        const result = await mongodb.getDatabase().db('ameiz-team-project').collection('study-material').updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: updateStudyMaterial }
        );

        if (result.matchedCount === 0) {
            res.status(404).json({message: 'Study material not found'});
        }else{
            res.status(200).json({message: 'Study material updated successfully' });
        }
    }catch (error) {
        console.error('error updating study material');
        res.status(500).json({
            message: 'Error updating study material',
            error: error.message
        })
    }
  }


  const deleteStudyMaterial = async (req, res) => {
    try{
        const studyMaterialId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db('ameiz-team-project').collection('study-material').deleteOne({ _id: studyMaterialId });

        if (result.deleteCount === 0) {
            res.status(404).json({message: 'Study material not found'});
        }else{
            res.status(200).json({
                message: 'study material was successfully deleted'
            })
        }
    }catch (error) {
        console.error('Error deleting study material', error);
        res.status(500).json({
            message: 'Error deleting study material',
            error: error.message
        })

    }
  }

  module.exports = {
    getAllStudyMaterials,
    getStudyMaterialById,
    createStudyMaterial,
    updateStudyMaterial,
    deleteStudyMaterial
  }