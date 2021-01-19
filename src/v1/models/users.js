const mongoose = require ('mongoose')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const validator = require('validator')
const { Schema } = mongoose

const UserSchema = new Schema({
    name:{
        type: String
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error ('Check email')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        validate(value){
            if (value.includes('password')){
                throw new Error ('password too generic')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})


UserSchema.methods.getAuthToken = async function (){
    const user = this

    const token = jwt.sign({_id: user._id.toString()}, 'thisisanencryptionstring')
    user.tokens = user.tokens.concat({token})
    await user.save()

    return token

}

UserSchema.pre('save', async function(next){
    const user = this

    if (user.isModified('password')){
        user.password = await bcryptjs.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', UserSchema)

module.exports = User