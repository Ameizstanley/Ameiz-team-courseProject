/**
 * Unit Tests for Teacher GET Routes
 * Author: Johnathan Babb
 */

const request = require('supertest');
const express = require('express');
const teacherRoutes = require('../routes/teachers');
const mongodb = require('../model/database');

// Create test app
const app = express();
app.use(express.json());
app.use('/teachers', teacherRoutes);

// Mock database connection
beforeAll(async () => {
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
    const db = mongodb.getDatabase();
    if (db && db.client) {
        await db.client.close();
    }
});

describe('GET /teachers', () => {
    test('should return all teachers with status 200', async () => {
        const response = await request(app).get('/teachers');
        
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('should return array of teacher objects', async () => {
        const response = await request(app).get('/teachers');
        
        if (response.body.length > 0) {
            expect(response.body[0]).toHaveProperty('firstName');
            expect(response.body[0]).toHaveProperty('lastName');
            expect(response.body[0]).toHaveProperty('email');
        }
    });

    test('should return JSON content type', async () => {
        const response = await request(app).get('/teachers');
        
        expect(response.headers['content-type']).toMatch(/json/);
    });
});

describe('GET /teachers/:id', () => {
    test('should return 400 for invalid ObjectId format', async () => {
        const response = await request(app).get('/teachers/invalid-id');
        
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
    });

    test('should return 404 for non-existent teacher', async () => {
        const fakeId = '507f1f77bcf86cd799439011';
        const response = await request(app).get(`/teachers/${fakeId}`);
        
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message');
    });

    test('should return teacher object for valid ID', async () => {
        const teachersResponse = await request(app).get('/teachers');
        
        if (teachersResponse.body.length > 0) {
            const validId = teachersResponse.body[0]._id;
            const response = await request(app).get(`/teachers/${validId}`);
            
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('_id');
            expect(response.body).toHaveProperty('firstName');
            expect(response.body).toHaveProperty('email');
        }
    });

    test('should return JSON content type for valid teacher', async () => {
        const teachersResponse = await request(app).get('/teachers');
        
        if (teachersResponse.body.length > 0) {
            const validId = teachersResponse.body[0]._id;
            const response = await request(app).get(`/teachers/${validId}`);
            
            expect(response.headers['content-type']).toMatch(/json/);
        }
    });
});
