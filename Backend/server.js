require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const workoutRouters = require('./routers/routers');
const usersRouters = require('./routers/usersRouters');
const mongoose = require('mongoose');


app = express();

app.use(express.json())
app.use(morgan('dev'))
mongoose.connect(process.env.MONGO_URL)
.then(
    app.listen(process.env.PORT,()=>{console.log(`http://localhost:9898/api/workout/`)})
)
.catch(err =>console.log(err));


app.use('/api/workout',workoutRouters);
app.use('/api/user',usersRouters);