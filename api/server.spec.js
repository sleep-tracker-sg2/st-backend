//import test dependencies
const request=require('supertest');
const server=require('./server.js');

describe('server test: server.js', () => {

    it('will run environment server tests', () => {
        expect(process.env.DB_ENV).toBe('undefined');
    });


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