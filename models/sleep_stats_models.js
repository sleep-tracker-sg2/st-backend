const db = require('../.database/dbConfig')

module.exports = {
    add,
    getUserStats,
    update,
    remove,
    getByDate,
    getByMonth,
    getByYear,
    getLimitOrder,
    getAnnual,
    getStat,
}

function add(tbl, item) {
    console.log(tbl)
    return db(tbl)
        .insert(item)
}

function getStat(id) {
    return db('sleep_stats')
        .join('sleep_month', 'sleep_stats.m', 'sleep_month.id')
        .join('sleep_year', 'sleep_stats.y', 'sleep_year.id')
        .join('sleep_emotions', 'sleep_stats.emotions', 'sleep_emotions.id')
        .join('sleep_day', 'sleep_stats.d', 'sleep_day.id')
        .where('sleep_stats.id', id)
        .first()
}

function getUserStats(id) {
    return db('sleep_stats')
        .join('sleep_month', 'sleep_stats.m', 'sleep_month.id')
        .join('sleep_year', 'sleep_stats.y', 'sleep_year.id')
        .join('sleep_emotions', 'sleep_stats.emotions', 'sleep_emotions.id')
        .join('sleep_day', 'sleep_stats.d', 'sleep_day.id')
        .where({ user_id: id })
}

function getByDate(id, date) {
    return db('sleep_stats')
        .where({
            user_id: id,
            date: date
        })
}

function getByMonth(id, month) {
    return db('sleep_stats')
        .join('sleep_month', 'sleep_stats.m', 'sleep_month.id')
        .where({
            user_id: id,
            month: month
        })
}

function getByYear(id, year) {
    return db('sleep_stats')
        .join('sleep_year', 'sleep_stats.y', 'sleep_year.id')
        .where({
            user_id: id,
            sleepYear: year
        })
}

function getLimitOrder(id, limit, order) {
    return db('sleep_stats')
        .where({
            user_id: id
        })
        .limit(limit)
        .orderBy('date', order)
}

function getAnnual(id, year) {
    return db('sleep_stats')
        .join('sleep_emotions', 'sleep_stats.emotions', 'sleep_emotions.id')
        .join('sleep_year', 'sleep_stats.y', 'sleep_year.id')
        .where({
            user_id: id,
            sleepYear: year,
        })
}

function update(tbl, id, item) {
    return db(tbl)
        .where({ id })
        .update(item)
}

function remove(tbl, id) {
    return db(tbl)
        .where({id})
        .del()
}