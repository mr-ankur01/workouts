const bcrypt = require('bcrypt')

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{ timestamps:true})

UserSchema.statics.signup = async function(email,password){
    if(!email || !password ){
        throw Error('Please fill all the fields')
    }
    const exists = await this.findOne({email});

    if(exists){
        throw Error('Email is already exists')
    }
    
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)

    const user = await this.create({email,password:hash})
    return(user)


}

UserSchema.statics.login = async function(email,password){ 

    if(!email || !password ){
        throw Error('Please fill all the fields')
    }

    const user = await this.findOne({email})

    if(!user){
        throw Error('Incorrect Email')
    }
    
    const match =await bcrypt.compare(password,user.password)

    if(!match){
        throw Error('Incorrect Password')
    }

    return user
} 

module.exports = mongoose.model('User',UserSchema)