//import test dependencies
const request=require('supertest');
const statsRoute=require('../api/server');

describe('stats router testing', () => {
    /*it("TC1.1: Testing the environment", () => {
      expect(process.env.DB_ENV).toBe("testing");
    }); */

    let stat = {
        user_id: 1,
        date: '10/20/2019',
        start_sleep: '11pm',
        end_sleep: '5am',
        waking_emotion: 'bad',
        sleep_emotion: 'good',
        month: 10,
        year: 2019,
        day: 20,
    }

    it('test POST - will return 201 ok', async () => {
        const res=await request(statsRoute)
                        .post('/sleep-stats')
                        .send(stat);
        expect(res.status).toBe(201);
    });

    it('expect response type to be json application', async() => {
        const res=await request(statsRoute).post('/sleep-actions/');
        expect(res.type).toBe('application/json');
    });
});