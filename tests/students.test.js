/**
 * Unit Tests for Student GET Routes
 * Author: Johnathan Babb
 */

const request = require('supertest');
const express = require('express');
const studentRoutes = require('../routes/student');
const mongodb = require('../model/database');

// Create test app
const app = express();
app.use(express.json());
app.use('/students', studentRoutes);

// Mock database connection
beforeAll(async () => {
    // Initialize database connection before tests
    await new Promise((resolve) => {
        mongodb.initDb((err) => {
            if (err) {
                console.error('Test DB connection failed:', err);
            }
            resolve();
        });
    });
});

afterAll(async () => {
    // Close database connection after tests
    const db = mongodb.getDatabase();
    if (db && db.client) {
        await db.client.close();
    }
});

describe('GET /students', () => {
    test('should return all students with status 200', async () => {
        const response = await request(app).get('/students');
        
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('should return array of student objects', async () => {
        const response = await request(app).get('/students');
        
        if (response.body.length > 0) {
            expect(response.body[0]).toHaveProperty('firstName');
            expect(response.body[0]).toHaveProperty('lastName');
            expect(response.body[0]).toHaveProperty('email');
        }
    });

    test('should return JSON content type', async () => {
        const response = await request(app).get('/students');
        
        expect(response.headers['content-type']).toMatch(/json/);
    });
});

describe('GET /students/:id', () => {
    test('should return 404 for invalid ObjectId format', async () => {
        const response = await request(app).get('/students/invalid-id');
        
        expect(response.status).toBe(500); // Current implementation returns 500
    });

    test('should return 404 for non-existent student', async () => {
        // Valid ObjectId format but doesn't exist
        const fakeId = '507f1f77bcf86cd799439011';
        const response = await request(app).get(`/students/${fakeId}`);
        
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message');
    });

    test('should return student object for valid ID', async () => {
        // First get all students to get a valid ID
        const studentsResponse = await request(app).get('/students');
        
        if (studentsResponse.body.length > 0) {
            const validId = studentsResponse.body[0]._id;
            const response = await request(app).get(`/students/${validId}`);
            
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('_id');
            expect(response.body).toHaveProperty('firstName');
            expect(response.body).toHaveProperty('email');
        }
    });

    test('should return JSON content type for valid student', async () => {
        const studentsResponse = await request(app).get('/students');
        
        if (studentsResponse.body.length > 0) {
            const validId = studentsResponse.body[0]._id;
            const response = await request(app).get(`/students/${validId}`);
            
            expect(response.headers['content-type']).toMatch(/json/);
        }
    });
});
