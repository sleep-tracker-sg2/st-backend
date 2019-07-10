//import test dependencies
const request=require('supertest');
const actionRoute=require('../api/server');

describe('action router testing', () => {
    /*it("TC1.1: Testing the environment", () => {
      expect(process.env.DB_ENV).toBe("testing");
    }); */

    let action = {
        user_id: 1,
        month: 10,
        year: '2019',
        sleepAction: 'good'
    }

    it('test POST - will return 201 ok', async () => {
        const res=await request(actionRoute)
                        .post('/sleep-actions')
                        .send(action);
        expect(res.status).toBe(201);
    });

    it('expect response type to be json application', async() => {
        const res=await request(actionRoute).post('/sleep-actions/');
        expect(res.type).toBe('application/json');
    });
});