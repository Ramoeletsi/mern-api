// const asyncHandler = require('express-async-handler')
// const Goal = require('../model/goalmodel')

// const getGoals = asyncHandler (async(req, res) => {
//     const goals =await Goal.find()
//     res.status(200).json(goals)
// })

// const setGoal = asyncHandler (async(req, res) => {
//     if(!req.body.text){
//         res.status(400)
//         throw new Error('Please add a text field')          
//     }
//     const goal = await Goal.create({
//         text: req.body.text
//     })
//     res.status(200).json(goal)
// })

// const updateGoal = asyncHandler (async(req, res) => {
//     const goals =await Goal.findById(req.params.id)
    
//     if(!goals){
//         res.status(400)
//         throw new Error('Goal not found')
//     }
//     const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new:true})
//     res.status(200).json(updatedGoal)
// })

// const deleteGoal = asyncHandler (async (req, res) => {
//     const goals =await Goal.findById(req.params.id)
    
//     if(!goals){
//         res.status(400)
//         throw new Error('Goal not found')
//     }
//     await goals.remove()
//     res.status(200).json({id: req.params.id})
// })


// module.exports ={
//     getGoals,
//     setGoal,
//     updateGoal,
//     deleteGoal,
// }


const App = require("../model/goalmodel");

// Create and Save a new Message
exports.create = (req, res) => {
  const message = new App({
    message: req.body.message,
  });
  message
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(404).send({
        message:
          err.message || "Some error occurred while creating the Message.",
      });
    });
};

// Retrieve all messages from the database.
exports.findAll = (req, res) => {
  App.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving messages.",
      });
    });
};

// Find a single message with a messageId
exports.findOne = (req, res) => {
  App.findById(req.params.messageId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Message not found with id " + req.params.messageId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Message not found with id " + req.params.messageId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving message with id " + req.params.messageId,
      });
    });
};

// Update a message identified by the messageId in the request
exports.update = (req, res) => {
  App.findByIdAndUpdate(
    req.params.messageId,
    {
      message: req.body.message,
    },
    { new: true }
  )
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Message not found with id " + req.params.messageId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Message not found with id " + req.params.messageId,
        });
      }
      return res.status(500).send({
        message: "Error updating message with id " + req.params.messageId,
      });
    });
};

// Delete a message with the specified messageId in the request
exports.delete = (req, res) => {
  App.findByIdAndRemove(req.params.messageId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Message not found with id " + req.params.messageId,
        });
      }
      res.send({ message: "Message deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Message not found with id " + req.params.messageId,
        });
      }
      return res.status(500).send({
        message: "Could not delete message with id " + req.params.messageId,
      });
    });
};
