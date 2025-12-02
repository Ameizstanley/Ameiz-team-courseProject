const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ameiz School Management API',
      version: '1.0.0',
      description: 'API documentation for the Ameiz School Management System',
      contact: {
        name: 'Ameiz Team',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Student: {
          type: 'object',
          required: ['firstName', 'lastName', 'email'],
          properties: {
            _id: {
              type: 'string',
              description: 'MongoDB ObjectId',
              example: '507f1f77bcf86cd799439011',
            },
            firstName: {
              type: 'string',
              description: 'Student first name',
              example: 'John',
            },
            lastName: {
              type: 'string',
              description: 'Student last name',
              example: 'Doe',
            },
            email: {
              type: 'string',
              description: 'Student email address',
              example: 'john.doe@example.com',
            },
            dateOfBirth: {
              type: 'string',
              format: 'date',
              description: 'Student date of birth',
              example: '2000-01-15',
            },
            enrollmentDate: {
              type: 'string',
              format: 'date',
              description: 'Date when student enrolled',
              example: '2023-09-01',
            },
          },
        },
        Teacher: {
          type: 'object',
          required: ['firstName', 'lastName', 'email'],
          properties: {
            _id: {
              type: 'string',
              description: 'MongoDB ObjectId',
              example: '507f1f77bcf86cd799439012',
            },
            firstName: {
              type: 'string',
              description: 'Teacher first name',
              example: 'Sarah',
            },
            lastName: {
              type: 'string',
              description: 'Teacher last name',
              example: 'Johnson',
            },
            email: {
              type: 'string',
              description: 'Teacher email address',
              example: 'sarah.johnson@example.com',
            },
            subject: {
              type: 'string',
              description: 'Subject taught by teacher',
              example: 'Mathematics',
            },
            department: {
              type: 'string',
              description: 'Department',
              example: 'Science',
            },
          },
        },
        StudyMaterial: {
          type: 'object',
          required: ['title', 'subject'],
          properties: {
            _id: {
              type: 'string',
              description: 'MongoDB ObjectId',
              example: '507f1f77bcf86cd799439013',
            },
            title: {
              type: 'string',
              description: 'Study material title',
              example: 'Introduction to Calculus',
            },
            subject: {
              type: 'string',
              description: 'Subject area',
              example: 'Mathematics',
            },
            description: {
              type: 'string',
              description: 'Material description',
              example: 'Comprehensive guide to differential calculus',
            },
            fileUrl: {
              type: 'string',
              description: 'URL to the study material file',
              example: 'https://example.com/materials/calculus101.pdf',
            },
            uploadDate: {
              type: 'string',
              format: 'date',
              description: 'Date when material was uploaded',
              example: '2023-09-15',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Error message',
              example: 'An error occurred',
            },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js'], // Path to your route files
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;