const db = require('../database/dbConfig');

const stats = require('../models/sleep_stats_models');

describe('stats model', () => {

    beforeEach(async () => {
        await db('sleep_stats')
        .truncate();
    })

    describe('add()', () => {
        
        it('will add a stat to the db',  async () => {
            const testStat = {
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
            await stats.add(testStat)
            const stat = await db('sleep_actions')
            expect(stat).toHaveLength(1)
        })
    })
})