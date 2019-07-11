const router = require('express').Router()
const auth = require('../auth/auth')
const statsDB = require('../models/sleep_stats_models')

router.post('/', auth, async (req, res) => {
    try {
        const { subject } = req.decoded
        const {
            date,
            start_sleep,
            end_sleep,
            waking_emotion,
            sleep_emotion,
            month,
            year,
            day
        } = req.body
        // let wakingEmotion = {emotion: waking_emotion}
        // let sleepEmotion = {emotion: sleep_emotion}
        let emotions = {
            sleep_emotion: sleep_emotion,
            waking_emotion: waking_emotion
        }
        let statMonth = { month: month }
        let statYear = { sleepYear: year }
        let statDay = { day: day }
        const statEmotions = await statsDB.add('sleep_emotions', emotions)
        // const statSE = await statsDB.add('sleep_emotions', sleepEmotion)
        const statM = await statsDB.add('sleep_month', statMonth)
        const statY = await statsDB.add('sleep_year', statYear)
        const statD = await statsDB.add('sleep_day', statDay)

        const newStats = {
            date: date,
            user_id: subject,
            start_sleep: start_sleep,
            end_sleep: end_sleep,
            emotions: statEmotions[0],
            // sleep_emotion: statEmotions[0],
            m: statM[0],
            y: statY[0],
            d: statD[0]
        }

        const stat = await statsDB.add('sleep_stats', newStats)
        res.status(201).json(stat)
    } catch ({ message }) {
        res.status(500).json({
            message
        })
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params
        const stats = await statsDB.getUserStats(id)
        if (stats.length > 0) {
            res.status(200).json(stats)
        } else {
            res.status(404).json({
                message: 'No sleep stats were found',
            })
        }
    } catch ({ message }) {
        res.status(500).json({
            message
        })
    }
})

router.get('/:id/date/:date', auth, async (req, res) => {
    try {
        const { id, date } = req.params
        const stats = await statsDB.getByDate(id, date)
        if (stats.length > 0) {
            res.status(200).json(stats)
        } else {
            res.status(404).json({
                message: 'There are no current stats of sleep of that specific date',
                date
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving stats by date"
        })
    }
})

router.get('/:id/month/:month', auth, async (req, res) => {
    try {
        const { id, month } = req.params
        const stats = await statsDB.getByMonth(id, month)
        if (stats.length > 0) {
            res.status(200).json(stats)
        } else {
            res.status(404).json({
                message: 'There are no current stats of sleep of that specific month'
            })
        }
    } catch ({ message }) {
        res.status(500).json({
            message
        })
    }
})

router.get('/:id/year/:year', auth, async (req, res) => {
    try {
        const { id, year } = req.params
        const stats = await statsDB.getByYear(id, year)
        if (stats.length > 0) {
            res.status(200).json(stats)
        } else {
            res.status(404).json({
                message: 'There are no current stats of sleep of that specific year'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving stats by year"
        })
    }
})

router.get('/:id/limit/:limit/order/:order', auth, async (req, res) => {
    try {
        const { id, limit, order } = req.params
        const stats = await statsDB.getLimitOrder(id, limit, order)
        res.status(200).json(stats)
    } catch (error) {
        console.log(req.params)
        res.status(500).json({
            message: 'Error retreiving sleep stats by limits and order'
        })
    }
})

router.get('/:id/annual/:year', auth, async (req, res) => {
    try {
        const { id, year } = req.params
        const stats = await statsDB.getAnnual(id, year)
        if (stats.length > 0) {
            let annualStats = []
            stats.map(stat => {
                let sum = parseInt(stat.waking_emotion) + parseInt(stat.sleep_emotion)
                if (sum >= 4) {
                    annualStats.push(stat)
                }
            })
            if (annualStats.length > 0) {
                res.status(200).json(annualStats)
            } else {
                res.status(404).json({
                    message: 'There are no stats with emotions greater than or equal 4'
                })
            }
        } else {
            res.status(404).json({
                message: 'There are no current stats of sleep of that specific year'
            })
        }
    } catch ({ message }) {
        res.status(500).json({
            message
        })
    }
})

router.put('/', auth, async (req, res) => {
    try {
        const { subject } = req.decoded
        const {
            id,
            date,
            start_sleep,
            end_sleep,
            waking_emotion,
            sleep_emotion,
            month,
            year,
            day,
            m,
            d,
            y,
            emotions
        } = req.body

        let updateEmotions = {
            sleep_emotion: sleep_emotion,
            waking_emotion: waking_emotion
        }
        let statMonth = { month: month }
        let statYear = { sleepYear: year }
        let statDay = { day: day }
        await statsDB.update('sleep_emotions', emotions, updateEmotions)
        await statsDB.update('sleep_month', m, statMonth)
        await statsDB.update('sleep_year', y, statYear)
        await statsDB.update('sleep_day', d, statDay)

        const updateStats = {
            id: id,
            date: date,
            user_id: subject,
            start_sleep: start_sleep,
            end_sleep: end_sleep,
            emotions: emotions,
            m: m,
            y: y,
            d: d
        }
        const stat = await statsDB.update('sleep_stats', id, updateStats)
        if (updateStats) {
            res.status(200).json(stat)
        } else {
            res.status(400).json({
                message: 'Missing a required input'
            })
        }
    } catch ({ message }) {
        res.status(500).json({
            message
        })
    }
})

router.delete('/:id/remove/:removeId', auth, async (req, res) => {
    try {
        const { removeId } = req.params
        const stat = await statsDB.getStat(removeId)
        const {emotions, m, d, y} = stat
        await statsDB.remove('sleep_emotions', emotions)
        await statsDB.remove('sleep_day', d)
        await statsDB.remove('sleep_month', m)
        await statsDB.remove('sleep_year', y)
        const delStat = await statsDB.remove('sleep_stats', removeId)
        if (delStat) {
            res.status(204).json({
                message: 'Sleep stats successfully removed'
            })
        } else {
            res.status(400).json({
                message: 'Sleeps stats with the specified date does not exist'
            })
        }
    } catch ({message}) {
        res.status(500).json({
            message
        })
    }
})


module.exports = router