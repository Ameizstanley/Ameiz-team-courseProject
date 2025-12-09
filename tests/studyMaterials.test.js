/**
 * Unit Tests for Study Materials GET Routes
 * Author: Johnathan Babb
 */

const request = require('supertest');
const express = require('express');
const studyMaterialsRoutes = require('../routes/studyMaterials');
const mongodb = require('../model/database');

// Create test app
const app = express();
app.use(express.json());
app.use('/study-materials', studyMaterialsRoutes);

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

describe('GET /study-materials', () => {
    test('should return all study materials with status 200', async () => {
        const response = await request(app).get('/study-materials');
        
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('should return array of study material objects', async () => {
        const response = await request(app).get('/study-materials');
        
        if (response.body.length > 0) {
            expect(response.body[0]).toHaveProperty('title');
            expect(response.body[0]).toHaveProperty('subject');
        }
    });

    test('should return JSON content type', async () => {
        const response = await request(app).get('/study-materials');
        
        expect(response.headers['content-type']).toMatch(/json/);
    });
});

describe('GET /study-materials/:id', () => {
    test('should return 500 for invalid ObjectId format', async () => {
        const response = await request(app).get('/study-materials/invalid-id');
        
        expect(response.status).toBe(500);
    });

    test('should return 404 for non-existent study material', async () => {
        const fakeId = '507f1f77bcf86cd799439011';
        const response = await request(app).get(`/study-materials/${fakeId}`);
        
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message');
    });

    test('should return study material object for valid ID', async () => {
        const materialsResponse = await request(app).get('/study-materials');
        
        if (materialsResponse.body.length > 0) {
            const validId = materialsResponse.body[0]._id;
            const response = await request(app).get(`/study-materials/${validId}`);
            
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('_id');
            expect(response.body).toHaveProperty('title');
            expect(response.body).toHaveProperty('subject');
        }
    });

    test('should return JSON content type for valid material', async () => {
        const materialsResponse = await request(app).get('/study-materials');
        
        if (materialsResponse.body.length > 0) {
            const validId = materialsResponse.body[0]._id;
            const response = await request(app).get(`/study-materials/${validId}`);
            
            expect(response.headers['content-type']).toMatch(/json/);
        }
    });
});
