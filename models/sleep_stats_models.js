const db = require('../.database/dbConfig')

module.exports = {
    add,
    getUserStats,
    update,
    remove,
    getByDate,
    getByMonth,
    getByYear
}

function add(sleepStats) {
    return db('sleep_stats')
        .insert(sleepStats)
}

function getUserStats (id) {
    return db('sleep_stats')
        .where({user_id: id})
}

function getByDate (id, date) {
    return db('sleep_stats')
        .where({ 
            user_id: id,
            date: date 
        })
}

function getByMonth (id, month) {
    return db('sleep_stats')
        .where({ 
            user_id: id,
            month: month 
        })
}

function getByYear (id, year) {
    return db('sleep_stats')
        .where({ 
            user_id: id,
            year: year 
        })
}
 
function update(stats, id, date) {
    return db('sleep_stats')
        .where({
            user_id: id, 
            date: date
        })
        .update(stats)
        .then(() => {
            return db('sleep_stats')
                .where({date: date})
                .first()
        })
}

function remove (id, date, year) {
    return db('sleep_stats')
        .where({
            user_id: id, 
            date: date, 
            year: year
        })
        .del()
}