const db = require('../database/dbConfig');

const Users = require('../models/user_models');

describe('users model', () => {

    beforeEach(async () => {
        await db('user')
        .truncate();
    })

    describe('insert()', () => {
        
        it('will insert a user to the db',  async () => {
            const testUser = {
                first_name: "hello",
                last_name: "bye",
                email: "you@me.com",
                username: "frank",
                password: "123"
            }
            await Users.add(testUser)
            const users = await db('user')
            expect(users).toHaveLength(1)
        })
    })
})