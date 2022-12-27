const Userdb = require('../models/Userdb')
const jwt = require('jsonwebtoken')

const createToken = (id) => {
    return jwt.sign({id}, process.env.SECRET ,{expiresIn:'3d'}) 
}
const signupUser =async (req,res)=>{
    try{    
        const {email,password} = req.body;

        const user = await Userdb.signup(email,password)
        const token = createToken(user._id)

        res.json({email,token})
    }catch(err){
        res.status(400).json({err:err.message})
    }
}

const loginUser =async (req,res)=>{
    try{
        const {email, password}= req.body;

        const user = await Userdb.login(email,password)
        const token = createToken(user._id)

        res.json({email,token})
    }catch(err){
        
        res.status(400).json({err:err.message})
    }
}


module.exports = {
    signupUser,
    loginUser
}