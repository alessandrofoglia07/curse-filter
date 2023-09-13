import app from './mocks/app';
import request from 'supertest';

describe('detectMiddleware', () => {
    it('should detect bad words', async () => {
        const res = await request(app).post('/upload').send({
            hello: 'world',
            hi: 'fuck you'
        });

        expect(res.statusCode).toBe(422);
        expect(res.body.ok).toBe(false);
    });

    it('should detect bad words in nested object', async () => {
        const res = await request(app)
            .post('/upload')
            .send({
                hello: 'world',
                hi: {
                    wow: 'fuck you'
                }
            });

        expect(res.statusCode).toBe(422);
        expect(res.body.ok).toBe(false);
    });

    it('should detect bad words in nested arrays and objects', async () => {
        const res = await request(app)
            .post('/upload')
            .send({
                hello: 'world',
                hi: [
                    {
                        wow: ['fuck']
                    }
                ]
            });

        expect(res.statusCode).toBe(422);
        expect(res.body.ok).toBe(false);
    });
});
