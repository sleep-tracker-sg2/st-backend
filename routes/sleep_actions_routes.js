const router = require('express').Router()
const auth = require('../auth/auth')

const actionsDB = require('../models/sleep_actions_models')

router.post('/', auth, async (req, res) => {
    try {
        const action = req.body
        const { subject } = req.decoded
        action.user_id = subject
        const add = await actionsDB.add(action)
        res.status(201).json(add)
    } catch (error) {
        res.status(500).json({
            message: 'Error adding action'
        })
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params
        const action = await actionsDB.getById(id)
        if (action.length > 0) {
            res.status(200).json(action)
        } else {
            res.status(404).json({
                message: 'No actions found'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error getting actions'
        })
    }
})

router.get('/:id/month/:month/year/:year', auth, async (req, res) => {
    try {
        const {id, month, year} = req.params
        const actions = await actionsDB.getByMonthYear(id, month, year)
        if (actions.length > 0) {
            res.status(200).json(actions)
        } else {
            res.status(404).json({
                message: 'No actions found by specific month and year'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error getting action by month and year'
        })
    }
})

router.put('/', auth, async (req, res) => {
    try {
        const updateAction = req.body
        const action = await actionsDB.update(updateAction.id, updateAction)
        if (action) {
            res.status(200).json(action)
        } else {
            res.status(400).json({
                message: 'Missing required input'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error updating action'
        })
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params
        const action = await actionsDB.remove(id)
        if (action) {
            res.status(204).json({
                message: 'Delete successful'
            })
        } else {
            res.status(404).json({
                message: 'Specified action does not exist'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting action'
        })
    }
})

module.exports = router