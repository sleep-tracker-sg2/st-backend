const router = require('express').Router()
const auth = require('../auth/auth')
const statsDB = require('../models/sleep_stats_models')

router.get('/:id', auth, async (req, res) => {
    try {
        const { subject } = req.decoded
        const stats = await statsDB.getUserStats(subject)
        res.status(200).json(stats)  
    } catch (error) {
        console.log(req.decoded.subject)
        res.status(500).json({
            message: 'Error retrieving data'
        })
    }
})

router.post('/', auth, async (req, res) => {
    try {
        const { subject } = req.decoded 
        const newStats = req.body
        newStats.user_id = subject
        const stats = await statsDB.add(newStats)
        res.status(201).json({
            stats,
            newStats
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error adding new sleep stats'
        })
    }
})

router.get('/:id/date/:date', auth, async (req, res) => {
    try {
        const { id, date } = req.params
        const stats = await statsDB.getByDate(id, date)
        if(stats.length > 0) {
            res.status(200).json(stats)
        } else {
            res.status(404).json({
                message: 'There are no current stats of sleep of that specific date'
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
        if(stats.length > 0) {
            res.status(200).json(stats)
        } else {
            res.status(404).json({
                message: 'There are no current stats of sleep of that specific month'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving stats by month"
        })
    }
})

router.get('/:id/year/:year', auth, async (req, res) => {
    try {
        const { id, year } = req.params
        const stats = await statsDB.getByYear(id, year)
        if(stats.length > 0) {
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


module.exports = router