import request from 'supertest';

import {
    EMAIL_VALIDATION_ERROR,
    NAME_VALIDATION_ERROR,
    SURNAME_VALIDATION_ERROR,
    CREATED_SUCCESS
} from '../constants';
import app from '../launcher';
import db from '../models';

describe('Post Endpoints', () => {
    it('should create a new user', async () => {
        const testEmail = 'ThomasMorgan@gmail.com';
        const res = await request(app)
            .post('/api/users')
            .send({
                email: testEmail,
                name: 'Thomas',
                surname: 'Morgan'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toEqual(true);
        expect(res.body.msg).toEqual(CREATED_SUCCESS);
        try {
            await db.user.deleteOne({email: testEmail});
        } catch (err) {
            throw new Error(`Error while restoring db: ${err.toString()}`);
        }
    })
    it('should be validation error', async () => {
        const testEmail = 'ThomasMorgan@gmail.com';
        const res = await request(app)
            .post('/api/users')
            .send({
                email: testEmail,
                name: 'Thomas1',
                surname: 'Morgan'
            });
        expect(res.statusCode).toEqual(500);
        expect(res.body.success).toEqual(false);
        expect(res.body.msg).toEqual(`Error while creating: ValidationError: name: ${NAME_VALIDATION_ERROR}`);
        try {
            await db.user.deleteOne({email: testEmail});
        } catch (err) {
            throw new Error(`Error while restoring db: ${err.toString()}`);
        }
    })
    it('should be validation error', async () => {
        const testEmail = 'ThomasMorgan@gmail.com';
        const res = await request(app)
            .post('/api/users')
            .send({
                email: testEmail,
                name: 'Thomas',
                surname: 'M0rgan'
            });
        expect(res.statusCode).toEqual(500);
        expect(res.body.success).toEqual(false);
        expect(res.body.msg).toEqual(`Error while creating: ValidationError: surname: ${SURNAME_VALIDATION_ERROR}`);
        try {
            await db.user.deleteOne({email: testEmail});
        } catch (err) {
            throw new Error(`Error while restoring db: ${err.toString()}`);
        }
    })
    it('should be validation error', async () => {
        const testEmail = 'ThomasMorgan';
        const res = await request(app)
            .post('/api/users')
            .send({
                email: testEmail,
                name: 'Thomas',
                surname: 'Morgan'
            });
        expect(res.statusCode).toEqual(500);
        expect(res.body.success).toEqual(false);
        expect(res.body.msg).toEqual(`Error while creating: ValidationError: email: ${EMAIL_VALIDATION_ERROR}`);
        try {
            await db.user.deleteOne({email: testEmail});
        } catch (err) {
            throw new Error(`Error while restoring db: ${err.toString()}`);
        }
    })
})

describe('Get Endpoints', () => {
    it('should get users', async () => {
        const res = await request(app)
            .get('/api/users')
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toEqual(true);
    })
})