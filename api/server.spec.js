//import test dependencies
const request=require('supertest');
const server=require('./server.js');

describe('server testing', () => {
    /*it("TC1.1: Testing the environment", () => {
      expect(process.env.DB_ENV).toBe("testing");
    }); */

    it('test GET - will return 200 ok', async () => {
        const res=await request(server).get('/');
        expect(res.status).toBe(200);
    });

    it('expect response type to be json application', async() => {
        const res=await request(server).get('/');
        expect(res.type).toBe('application/json');
    });

    it('it will test that api is up', async () => {
        const res=await request(server).get('/')
        const {msg}=res.body;
        expect(msg).toBe('Interesting. You\'re afraid of insects and women. Ladybugs must render you catatonic.');
    });

   
    });