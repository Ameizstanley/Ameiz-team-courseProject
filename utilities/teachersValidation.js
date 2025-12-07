const {body, validationResult, param} = require('express-validator');

const validate = {}

validate.createTeacherRules = () => {
    return [
        body('firstName')
        .trim()
        .notEmpty()
        .withMessage('First name is required')
        .isLength({min: 2})
        .withMessage('First name must be at least 2 characters long'),

        body('lastName')
        .trim()
        .notEmpty()
        .withMessage('Last name is required')
        .isLength({min: 2})
        .withMessage('Last name must be at least 2 characters long'),


        body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .trim()
        .normalizeEmail(),

       body('subject')
        .notEmpty().withMessage('Subject is required')
        .isLength({min: 2}).withMessage('Subject must be at least 2 characters long')
        .trim(),
    ]
}


validate.updateTeacherRules = () => {
    return [
        body('firstName')
        .trim()
        .notEmpty()
        .withMessage('First name is required')
        .isLength({min: 2})
        .withMessage('First name must be at least 2 characters long'),

        body('lastName')
        .trim()
        .notEmpty()
        .withMessage('Last name is required')
        .isLength({min: 2})
        .withMessage('Last name must be at least 2 characters long'),


        body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .trim()
        .normalizeEmail(),

       body('subject')
        .notEmpty().withMessage('Subject is required')
        .isLength({min: 2}).withMessage('Subject must be at least 2 characters long')
        .trim(),
    ]
}


validate.checkCreateTeacher = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
}


validate.checkUpdateTeacher = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
}


module.exports = validate;