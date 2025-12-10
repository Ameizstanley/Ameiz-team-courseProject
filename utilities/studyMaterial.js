const {body, validationResult, param} = require('express-validator');

const validate = {}

validate.createStudyMaterialRules = () => {
    return [
        body('title')
        .notEmpty().withMessage('Title is required')
        .isLength({min: 3}).withMessage('Title must be at least 3 characters long')
        .trim(),

        body('gradeLevel')
        .notEmpty().withMessage('Grade level is required')
        .isLength({min: 1}).withMessage('Grade level must be at least 1 character long')
        .trim(),

        body('description')
        .optional()
        .isLength({max: 500}).withMessage('Description can be up to 500 characters long')
        .trim(),


        body('teacherName')
        .notEmpty().withMessage('Grade level is required')
        .isLength({min: 1}).withMessage('Grade level must be at least 1 character long')
        .trim(),


        
    ]
}
   

validate.updateStudyMaterialRules = () => {
    return [
        body('title')
        .notEmpty().withMessage('Title is required')
        .isLength({min: 3}).withMessage('Title must be at least 3 characters long')
        .trim(),

        body('gradeLevel')
        .notEmpty().withMessage('Grade level is required')
        .isLength({min: 1}).withMessage('Grade level must be at least 1 character long')
        .trim(),

        body('description')
        .optional()
        .isLength({max: 500}).withMessage('Description can be up to 500 characters long')
        .trim(),


        body('teacherName')
        .notEmpty().withMessage('Grade level is required')
        .isLength({min: 1}).withMessage('Grade level must be at least 1 character long')
        .trim(),
    ]
}


validate.checkCreateStudyMaterial = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}


validate.checkUpdateStudyMaterial = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}



module.exports = validate