/**
 * Unit Tests for Parent GET Routes
 * Author: Johnathan Babb
 */

const request = require('supertest');
const express = require('express');
const parentRoutes = require('../routes/parent');
const mongodb = require('../model/database');

// Create test app
const app = express();
app.use(express.json());
app.use('/parents', parentRoutes);

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
    // Close database connection after tests
    const db = mongodb.getDatabase();
    if (db && db.client) {
        await db.client.close();
    }
});

describe('GET /parents', () => {
    test('should return all parents with status 200', async () => {
        const response = await request(app).get('/parents');
        
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('should return array of parent objects', async () => {
        const response = await request(app).get('/parents');
        
        if (response.body.length > 0) {
            expect(response.body[0]).toHaveProperty('parent_name');
            expect(response.body[0]).toHaveProperty('email');
            expect(response.body[0]).toHaveProperty('phone');
        }
    });

    test('should return JSON content type', async () => {
        const response = await request(app).get('/parents');
        
        expect(response.headers['content-type']).toMatch(/json/);
    });
});

describe('GET /parents/:id', () => {
    test('should return 500 for invalid ObjectId format', async () => {
        const response = await request(app).get('/parents/invalid-id');
        
        expect(response.status).toBe(500);
    });

    test('should return 404 for non-existent parent', async () => {
        const fakeId = '507f1f77bcf86cd799439011';
        const response = await request(app).get(`/parents/${fakeId}`);
        
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message');
    });

    test('should return parent object for valid ID', async () => {
        const parentsResponse = await request(app).get('/parents');
        
        if (parentsResponse.body.length > 0) {
            const validId = parentsResponse.body[0]._id;
            const response = await request(app).get(`/parents/${validId}`);
            
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('_id');
            expect(response.body).toHaveProperty('parent_name');
            expect(response.body).toHaveProperty('email');
        }
    });

    test('should return JSON content type for valid parent', async () => {
        const parentsResponse = await request(app).get('/parents');
        
        if (parentsResponse.body.length > 0) {
            const validId = parentsResponse.body[0]._id;
            const response = await request(app).get(`/parents/${validId}`);
            
            expect(response.headers['content-type']).toMatch(/json/);
        }
    });
});
