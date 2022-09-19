const express = require('express')
const router = express.Router()
const {getGoals, setGoal, updateGoal, deleteGoal} = require('../controller/GoalController')

// changed (app to router ) 
// changed ('/api/goals' to '/') to hide from the fron end and directed it to the json file

// router.get('/', (req, res) => {
//     // res.send('Get goals')
//     res.status(200).json({message:'Get goals'})
// })

// router.route('/').get(getGoals).post(setGoal)
// router.route('/:id').put(updateGoal).delete(deleteGoal)

router.get('/', getGoals)

router.post('/',setGoal)

router.put('/:id', updateGoal)

router.delete('/:id',deleteGoal)
module.exports = router