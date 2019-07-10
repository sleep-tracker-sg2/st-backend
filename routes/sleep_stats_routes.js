const router = require('express').Router()
const auth = require('../auth/auth')
const statsDB = require('../models/sleep_stats_models')

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

router.get('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params
        const stats = await statsDB.getUserStats(id)
        if(stats.length > 0 ) {
            res.status(200).json(stats)  
        } else {
            res.status(404).json({
                message: 'No sleep stats were found'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving data'
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
        if(stats.length > 0 ){
            res.status(200).json(stats)
        } else {
            res.status(404).json({
                message: 'There are no current stats of sleep of that specific year'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving annual sleep stats'
        })
    }
})

router.put('/', auth, async (req, res) => {
    try {
        const { subject } = req.decoded
        const updatedStat = req.body
        const stat = await statsDB.update(subject, updatedStat)
        if(updatedStat) {
            res.status(200).json(stat)
        } else {
            res.status(400).json({
                message: 'Missing a required input'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error updating sleep stats'
        })
    }
})

router.delete('/:id/date/:date', auth, async (req, res) => {
    try {
        const { id, date } = req.params
        const stat = await statsDB.remove(id, date)
        if(stat) {
            res.status(204).json({
                message: 'Sleep stats successfully removed'
            })
        } else {
            res.status(400).json({
                message: 'Sleeps stats with the specified date does not exist'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting sleep stats'
        })
    }
})


module.exports = router