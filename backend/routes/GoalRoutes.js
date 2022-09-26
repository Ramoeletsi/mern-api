// const express = require('express')
// const router = express.Router()
// const {getGoals, setGoal, updateGoal, deleteGoal} = require('../controller/GoalController')

// router.route('/').get(getGoals).post(setGoal)
// router.route('/:id').put(updateGoal).delete(deleteGoal)

// module.exports = router

module.exports = (app) => {
    const App = require("../controller/GoalController");
  
    app.post("/create", App.create);
  
    app.get("/get-all", App.findAll);
  
    app.get("/message/:messageId", App.findOne);
  
    app.put("/message/:messageId", App.update);
  
    app.delete("/message/:messageId", App.delete);
  };