const {body, validationResult, param} = require('express-validator');

const validate = {}

validate.createParentRules =() => {
    return [
        body('parent_name')
        .notEmpty().withMessage('Parent name is required')
        .isLength({min: 3})
        .withMessage('Parent name must be at least 3 characters long')
        .trim(),


        body('gender')
        .trim()
        .notEmpty().withMessage('Gender Must be Male or Female')
        .isLength({min: 4}),


        body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .trim()
        .normalizeEmail(),


        body('phone')
        .notEmpty().withMessage('Phone number is required')
        .isMobilePhone().withMessage('Invalid phone number')
        .trim(),


        body('occupation')
        .notEmpty().withMessage('Occupation is required')
        .trim(),


        body('relationship_to_student')
        .notEmpty().withMessage('Relationship to student is required')
        .trim(),


        body('children_names')
        .notEmpty().withMessage('Children names are required')
        .isArray({min: 1}).withMessage('Children names must be an array with at least one name'),


        body('children_grades')
        .notEmpty().withMessage('Children grades are required')
        .isArray({min: 1}).withMessage('Children grades must be an array with at least one grade'),
    ]
}




validate.updateParentRules =() => {
    return [
        body('parent_name')
        .optional()
        .isLength({min: 3})
        .withMessage('Parent name must be at least 3 characters long')
        .trim(),


        body('gender')
        .optional()
        .trim()
        .isLength({min: 4}),


        body('email')
        .optional()
        .isEmail().withMessage('Invalid email format')
        .trim()
        .normalizeEmail(),


        body('phone')
        .optional()
        .isMobilePhone().withMessage('Invalid phone number')
        .trim(),


        body('occupation')
        .optional()
        .trim(),

        body('relationship_to_student')
        .optional()
        .trim(),

        body('children_names')
        .optional()
        .isArray({min: 1}).withMessage('Children names must be an array with at least one name'),

        body('children_grades')
        .optional()
        .isArray({min: 1}).withMessage('Children grades must be an array with at least one grade'),
    ]
}



validate.checkCreateParents = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    next();
}

validate.checkUpdateParents = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    next();
}




module.exports = validate;
