import request from 'supertest';

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
        expect(res.body.msg).toEqual('Created successfully');
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