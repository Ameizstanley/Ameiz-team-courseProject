/**
 * Validation Middleware for Study Materials
 * Author: Johnathan Babb
 */

// Validate email format
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Validate URL format
const isValidURL = (url) => {
    try {
        new URL(url);
        return true;
    } catch (err) {
        return false;
    }
};

// Validate date format (YYYY-MM-DD)
const isValidDate = (dateString) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateString)) return false;
    
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
};

/**
 * Validate Study Material Creation
 * Checks required fields and data types
 */
const validateCreateStudyMaterial = (req, res, next) => {
    const { title, subject, description, fileUrl, uploadDate } = req.body;
    const errors = [];

    // Required field validation
    if (!title || typeof title !== 'string' || title.trim() === '') {
        errors.push('Title is required and must be a non-empty string');
    } else if (title.length > 200) {
        errors.push('Title must not exceed 200 characters');
    }

    if (!subject || typeof subject !== 'string' || subject.trim() === '') {
        errors.push('Subject is required and must be a non-empty string');
    } else if (subject.length > 100) {
        errors.push('Subject must not exceed 100 characters');
    }

    // Optional field validation
    if (description && typeof description !== 'string') {
        errors.push('Description must be a string');
    } else if (description && description.length > 1000) {
        errors.push('Description must not exceed 1000 characters');
    }

    if (fileUrl && typeof fileUrl !== 'string') {
        errors.push('File URL must be a string');
    } else if (fileUrl && !isValidURL(fileUrl)) {
        errors.push('File URL must be a valid URL');
    }

    if (uploadDate && !isValidDate(uploadDate)) {
        errors.push('Upload date must be in YYYY-MM-DD format');
    }

    // If there are validation errors, return 400
    if (errors.length > 0) {
        return res.status(400).json({
            error: 'Validation failed',
            details: errors
        });
    }

    // Sanitize input - trim whitespace
    req.body.title = title.trim();
    req.body.subject = subject.trim();
    if (description) req.body.description = description.trim();

    next();
};

/**
 * Validate Study Material Update
 * Similar to create but all fields are optional
 */
const validateUpdateStudyMaterial = (req, res, next) => {
    const { title, subject, description, fileUrl, uploadDate } = req.body;
    const errors = [];

    // At least one field should be provided for update
    if (!title && !subject && !description && !fileUrl && !uploadDate) {
        return res.status(400).json({
            error: 'At least one field must be provided for update'
        });
    }

    // Optional field validation
    if (title !== undefined) {
        if (typeof title !== 'string' || title.trim() === '') {
            errors.push('Title must be a non-empty string');
        } else if (title.length > 200) {
            errors.push('Title must not exceed 200 characters');
        }
    }

    if (subject !== undefined) {
        if (typeof subject !== 'string' || subject.trim() === '') {
            errors.push('Subject must be a non-empty string');
        } else if (subject.length > 100) {
            errors.push('Subject must not exceed 100 characters');
        }
    }

    if (description !== undefined) {
        if (typeof description !== 'string') {
            errors.push('Description must be a string');
        } else if (description.length > 1000) {
            errors.push('Description must not exceed 1000 characters');
        }
    }

    if (fileUrl !== undefined) {
        if (typeof fileUrl !== 'string') {
            errors.push('File URL must be a string');
        } else if (!isValidURL(fileUrl)) {
            errors.push('File URL must be a valid URL');
        }
    }

    if (uploadDate !== undefined && !isValidDate(uploadDate)) {
        errors.push('Upload date must be in YYYY-MM-DD format');
    }

    // If there are validation errors, return 400
    if (errors.length > 0) {
        return res.status(400).json({
            error: 'Validation failed',
            details: errors
        });
    }

    // Sanitize input - trim whitespace for string fields
    if (title) req.body.title = title.trim();
    if (subject) req.body.subject = subject.trim();
    if (description) req.body.description = description.trim();

    next();
};

/**
 * Validate MongoDB ObjectId
 */
const validateObjectId = (req, res, next) => {
    const { id } = req.params;
    
    // MongoDB ObjectId is 24 characters hex string
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;
    
    if (!objectIdRegex.test(id)) {
        return res.status(400).json({
            error: 'Invalid ID format',
            details: ['ID must be a valid MongoDB ObjectId (24 character hex string)']
        });
    }
    
    next();
};

module.exports = {
    validateCreateStudyMaterial,
    validateUpdateStudyMaterial,
    validateObjectId
};
