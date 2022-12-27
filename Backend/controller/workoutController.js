const Workoutdb = require('../models/Workoutdb');
const mongoose = require('mongoose');

const getallWorkout = async (req, res) => {
    try {
        const user_id = req.user._id
        const allData = await Workoutdb.find({user_id}).sort({ createdAt: -1 })
        if (!allData) {
            res.status(400).json({ error: 'There is no data' })
        }
        res.status(200).json( allData )
    } catch (err) {
        res.status(400).json({ error: err })
    }
}

const getoneWorkout = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such id' })
        }
        const oneData = await Workoutdb.findById(id)
        res.status(200).json({ oneData })
    } catch (err) {
        res.status(400).json({ 'error': err })
    }
}

const postWorkout = async (req, res) => {
    try{
    const { title , reps , load } = req.body
    const user_id = req.user._id
    let emptyFields = []

    if(!title){ 
        emptyFields.push('title')
    }
    if(!reps){
        emptyFields.push('reps')
     }
    if(!load){ 
        emptyFields.push('load')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error:'please fill in all the fields',emptyFields})
      }

        const data = await Workoutdb.create({title,reps,load,user_id});
        res.status(200).json( data )

    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const deleteWorkout = async (req, res) => {
    const { id } = req.params
    console.log(id)
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such id' })
    }

    const del = await Workoutdb.findByIdAndDelete(id)
    if (!del) {
        return res.status(400).json({ error: 'no such data' })
    }
    res.status(200).json(del)
}

const patchWorkout = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such id' })
    }
    const update = await Workoutdb.findByIdAndUpdate(id, { ...req.body })
    if (!update) {
        return res.json({ error: 'no such data' })
    }

    res.json({ update })
}

module.exports = {
    getallWorkout,
    getoneWorkout,
    postWorkout,
    deleteWorkout,
    patchWorkout
}