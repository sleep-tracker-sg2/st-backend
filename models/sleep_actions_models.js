const db = require('../database/dbConfig')

module.exports = {
    add,
    getById,
    getByMonthYear,
    update,
    remove
}

function add (sleepAction) {
    return db('sleep_actions')
        .insert(sleepAction)
}

function getById (id) {
    return db('sleep_actions')
        .where({user_id: id})
}

function getByMonthYear (id, month, year) {
    return db('sleep_actions')
        .where({
            user_id: id,
            month: month,
            year: year
        })
}

function update (id, action) {
    return db('sleep_actions')
        .where({id})
        .update(action)
}

function remove (id) {
    return db('sleep_actions')
        .where({id})
        .del()
}