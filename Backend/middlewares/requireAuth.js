const jwt = require('jsonwebtoken')
const Userdb = require('../models/Userdb')

const requireAuth = async (req, res, next) => {
    
    const { authorization } = req.headers;
    if(!authorization){
        return res.status(400).json({error:'Authorization token required'})
    }

    const token = authorization.split(' ')[1]
    try{
        const { id } = jwt.verify(token, process.env.SECRET )
        req.user = await Userdb.findOne({_id:id}).select('_id')
        next()


    }catch(err){
        console.log(err)
        res.status(400).json({err:'Request is not authorized'})
    }

}

module.exports = requireAuth;