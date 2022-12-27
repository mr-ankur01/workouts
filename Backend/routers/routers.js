const express =require('express');
const {getoneWorkout,getallWorkout,postWorkout,deleteWorkout,patchWorkout} = require("../controller/workoutController");
const requireAuth = require('../middlewares/requireAuth');

const routers = express.Router() ;

routers.use(requireAuth)

routers.get('/', getallWorkout);

routers.get('/:id', getoneWorkout);

routers.post('/', postWorkout);

routers.delete('/:id',deleteWorkout );

routers.patch('/:id', patchWorkout);


module.exports = routers;