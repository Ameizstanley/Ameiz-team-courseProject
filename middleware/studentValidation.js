/**
 * Validation Middleware for Students
 * Author: Johnathan Babb
 */

// Validate email format
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Validate date format (YYYY-MM-DD)
const isValidDate = (dateString) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateString)) return false;
    
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
};

// Validate phone number format (basic validation for various formats)
const isValidPhoneNumber = (phone) => {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

// Validate zip code (supports various formats)
const isValidZipCode = (zipCode) => {
    // Supports US (12345 or 12345-6789) and other formats
    const zipRegex = /^[\d\-\s]+$/;
    return zipRegex.test(zipCode);
};

/**
 * Validate Student Creation
 * Checks required fields and data types
 */
const validateCreateStudent = (req, res, next) => {
    const { firstName, lastName, email, dateOfBirth, gradeLevel, enrollmentDate, phoneNumber, address } = req.body;
    const errors = [];

    // Required field validation - firstName
    if (!firstName || typeof firstName !== 'string' || firstName.trim() === '') {
        errors.push('First name is required and must be a non-empty string');
    } else if (firstName.length > 50) {
        errors.push('First name must not exceed 50 characters');
    }

    // Required field validation - lastName
    if (!lastName || typeof lastName !== 'string' || lastName.trim() === '') {
        errors.push('Last name is required and must be a non-empty string');
    } else if (lastName.length > 50) {
        errors.push('Last name must not exceed 50 characters');
    }

    // Required field validation - email
    if (!email || typeof email !== 'string' || email.trim() === '') {
        errors.push('Email is required and must be a non-empty string');
    } else if (!isValidEmail(email)) {
        errors.push('Email must be a valid email address');
    } else if (email.length > 100) {
        errors.push('Email must not exceed 100 characters');
    }

    // Required field validation - dateOfBirth
    if (!dateOfBirth) {
        errors.push('Date of birth is required');
    } else if (!isValidDate(dateOfBirth)) {
        errors.push('Date of birth must be in YYYY-MM-DD format');
    } else {
        // Check if date is in the past
        const birthDate = new Date(dateOfBirth);
        if (birthDate >= new Date()) {
            errors.push('Date of birth must be in the past');
        }
    }

    // Required field validation - gradeLevel
    if (gradeLevel === undefined || gradeLevel === null || gradeLevel === '') {
        errors.push('Grade level is required');
    } else if (typeof gradeLevel !== 'number' && typeof gradeLevel !== 'string') {
        errors.push('Grade level must be a number or string');
    } else if (typeof gradeLevel === 'string' && gradeLevel.trim() === '') {
        errors.push('Grade level cannot be empty');
    }

    // Required field validation - enrollmentDate
    if (!enrollmentDate) {
        errors.push('Enrollment date is required');
    } else if (!isValidDate(enrollmentDate)) {
        errors.push('Enrollment date must be in YYYY-MM-DD format');
    }

    // Optional field validation - phoneNumber
    if (phoneNumber) {
        if (typeof phoneNumber !== 'string') {
            errors.push('Phone number must be a string');
        } else if (!isValidPhoneNumber(phoneNumber)) {
            errors.push('Phone number must be a valid phone number with at least 10 digits');
        } else if (phoneNumber.length > 20) {
            errors.push('Phone number must not exceed 20 characters');
        }
    }

    // Required nested object validation - address
    if (!address || typeof address !== 'object') {
        errors.push('Address is required and must be an object');
    } else {
        // Validate address.street
        if (!address.street || typeof address.street !== 'string' || address.street.trim() === '') {
            errors.push('Address street is required and must be a non-empty string');
        } else if (address.street.length > 100) {
            errors.push('Address street must not exceed 100 characters');
        }

        // Validate address.city
        if (!address.city || typeof address.city !== 'string' || address.city.trim() === '') {
            errors.push('Address city is required and must be a non-empty string');
        } else if (address.city.length > 50) {
            errors.push('Address city must not exceed 50 characters');
        }

        // Validate address.state
        if (!address.state || typeof address.state !== 'string' || address.state.trim() === '') {
            errors.push('Address state is required and must be a non-empty string');
        } else if (address.state.length > 50) {
            errors.push('Address state must not exceed 50 characters');
        }

        // Validate address.zipCode
        if (!address.zipCode || typeof address.zipCode !== 'string' || address.zipCode.trim() === '') {
            errors.push('Address zip code is required and must be a non-empty string');
        } else if (!isValidZipCode(address.zipCode)) {
            errors.push('Address zip code must be a valid format');
        } else if (address.zipCode.length > 20) {
            errors.push('Address zip code must not exceed 20 characters');
        }

        // Validate address.country
        if (!address.country || typeof address.country !== 'string' || address.country.trim() === '') {
            errors.push('Address country is required and must be a non-empty string');
        } else if (address.country.length > 50) {
            errors.push('Address country must not exceed 50 characters');
        }
    }

    // If there are validation errors, return 400
    if (errors.length > 0) {
        return res.status(400).json({
            error: 'Validation failed',
            details: errors
        });
    }

    // Sanitize input - trim whitespace
    req.body.firstName = firstName.trim();
    req.body.lastName = lastName.trim();
    req.body.email = email.trim().toLowerCase();
    if (phoneNumber) req.body.phoneNumber = phoneNumber.trim();
    
    if (address) {
        req.body.address.street = address.street.trim();
        req.body.address.city = address.city.trim();
        req.body.address.state = address.state.trim();
        req.body.address.zipCode = address.zipCode.trim();
        req.body.address.country = address.country.trim();
    }

    next();
};

/**
 * Validate Student Update
 * Similar to create but all fields are optional
 */
const validateUpdateStudent = (req, res, next) => {
    const { firstName, lastName, email, dateOfBirth, gradeLevel, enrollmentDate, phoneNumber, address } = req.body;
    const errors = [];

    // At least one field should be provided for update
    if (!firstName && !lastName && !email && !dateOfBirth && !gradeLevel && !enrollmentDate && !phoneNumber && !address) {
        return res.status(400).json({
            error: 'At least one field must be provided for update'
        });
    }

    // Optional field validation - firstName
    if (firstName !== undefined) {
        if (typeof firstName !== 'string' || firstName.trim() === '') {
            errors.push('First name must be a non-empty string');
        } else if (firstName.length > 50) {
            errors.push('First name must not exceed 50 characters');
        }
    }

    // Optional field validation - lastName
    if (lastName !== undefined) {
        if (typeof lastName !== 'string' || lastName.trim() === '') {
            errors.push('Last name must be a non-empty string');
        } else if (lastName.length > 50) {
            errors.push('Last name must not exceed 50 characters');
        }
    }

    // Optional field validation - email
    if (email !== undefined) {
        if (typeof email !== 'string' || email.trim() === '') {
            errors.push('Email must be a non-empty string');
        } else if (!isValidEmail(email)) {
            errors.push('Email must be a valid email address');
        } else if (email.length > 100) {
            errors.push('Email must not exceed 100 characters');
        }
    }

    // Optional field validation - dateOfBirth
    if (dateOfBirth !== undefined) {
        if (!isValidDate(dateOfBirth)) {
            errors.push('Date of birth must be in YYYY-MM-DD format');
        } else {
            const birthDate = new Date(dateOfBirth);
            if (birthDate >= new Date()) {
                errors.push('Date of birth must be in the past');
            }
        }
    }

    // Optional field validation - gradeLevel
    if (gradeLevel !== undefined) {
        if (typeof gradeLevel !== 'number' && typeof gradeLevel !== 'string') {
            errors.push('Grade level must be a number or string');
        } else if (typeof gradeLevel === 'string' && gradeLevel.trim() === '') {
            errors.push('Grade level cannot be empty');
        }
    }

    // Optional field validation - enrollmentDate
    if (enrollmentDate !== undefined) {
        if (!isValidDate(enrollmentDate)) {
            errors.push('Enrollment date must be in YYYY-MM-DD format');
        }
    }

    // Optional field validation - phoneNumber
    if (phoneNumber !== undefined) {
        if (typeof phoneNumber !== 'string') {
            errors.push('Phone number must be a string');
        } else if (phoneNumber.trim() !== '' && !isValidPhoneNumber(phoneNumber)) {
            errors.push('Phone number must be a valid phone number with at least 10 digits');
        } else if (phoneNumber.length > 20) {
            errors.push('Phone number must not exceed 20 characters');
        }
    }

    // Optional nested object validation - address
    if (address !== undefined) {
        if (typeof address !== 'object' || address === null) {
            errors.push('Address must be an object');
        } else {
            // Validate address.street if provided
            if (address.street !== undefined) {
                if (typeof address.street !== 'string' || address.street.trim() === '') {
                    errors.push('Address street must be a non-empty string');
                } else if (address.street.length > 100) {
                    errors.push('Address street must not exceed 100 characters');
                }
            }

            // Validate address.city if provided
            if (address.city !== undefined) {
                if (typeof address.city !== 'string' || address.city.trim() === '') {
                    errors.push('Address city must be a non-empty string');
                } else if (address.city.length > 50) {
                    errors.push('Address city must not exceed 50 characters');
                }
            }

            // Validate address.state if provided
            if (address.state !== undefined) {
                if (typeof address.state !== 'string' || address.state.trim() === '') {
                    errors.push('Address state must be a non-empty string');
                } else if (address.state.length > 50) {
                    errors.push('Address state must not exceed 50 characters');
                }
            }

            // Validate address.zipCode if provided
            if (address.zipCode !== undefined) {
                if (typeof address.zipCode !== 'string' || address.zipCode.trim() === '') {
                    errors.push('Address zip code must be a non-empty string');
                } else if (!isValidZipCode(address.zipCode)) {
                    errors.push('Address zip code must be a valid format');
                } else if (address.zipCode.length > 20) {
                    errors.push('Address zip code must not exceed 20 characters');
                }
            }

            // Validate address.country if provided
            if (address.country !== undefined) {
                if (typeof address.country !== 'string' || address.country.trim() === '') {
                    errors.push('Address country must be a non-empty string');
                } else if (address.country.length > 50) {
                    errors.push('Address country must not exceed 50 characters');
                }
            }
        }
    }

    // If there are validation errors, return 400
    if (errors.length > 0) {
        return res.status(400).json({
            error: 'Validation failed',
            details: errors
        });
    }

    // Sanitize input - trim whitespace for provided fields
    if (firstName) req.body.firstName = firstName.trim();
    if (lastName) req.body.lastName = lastName.trim();
    if (email) req.body.email = email.trim().toLowerCase();
    if (phoneNumber) req.body.phoneNumber = phoneNumber.trim();
    
    if (address) {
        if (address.street) req.body.address.street = address.street.trim();
        if (address.city) req.body.address.city = address.city.trim();
        if (address.state) req.body.address.state = address.state.trim();
        if (address.zipCode) req.body.address.zipCode = address.zipCode.trim();
        if (address.country) req.body.address.country = address.country.trim();
    }

    next();
};

module.exports = {
    validateCreateStudent,
    validateUpdateStudent
}; 