// const express = require('express')
// const dotenv = require("dotenv").config()
// const {errorHandler} = require ('./middleware/errorMiddleware')
// const connectDB = require ('./config/db')
// const port = process.env.PORT || 5000

// connectDB()

// const app = express()

// app.use(express.json())
// app.use(express.urlencoded({extended:false}))
// app.use('/api/goals', require('./routes/GoalRoutes'))
// app.use(errorHandler)

// app.listen(port, () => console.log(`server started on port ${port}`))
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require ('./config/db');

connectDB()
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json({"message": "Server is running :D"});
});

let PORT = 8080
require('./routes/GoalRoutes')(app);
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});