const db = require('../database/dbConfig');

const actions = require('../models/sleep_actions_models');

describe('actions model', () => {

    beforeEach(async () => {
        await db('sleep_actions')
        .truncate();
    })

    describe('add()', () => {
        
        it('will add an action to the db',  async () => {
            const testAction = {
                user_id: 1,
                month: 10,
                year: '2019',
                sleepAction: 'good'
            }
            await actions.add(testAction)
            const action = await db('sleep_actions')
            expect(action).toHaveLength(1)
        })
    })
})