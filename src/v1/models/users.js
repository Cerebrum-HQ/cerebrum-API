const mongoose = require ('mongoose')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const validator = require('validator')
const { Schema } = mongoose

const UserSchema = new Schema({
    name:{
        type: String
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
            if(!validator.isStrongPassword(value, {minlength: 6,
                minLowercase: 1, minUppercase: 1,
                minNumbers: 1, minSymbols: 1,}))
                throw new Error('Password weak')

        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})


UserSchema.statics.findByCredentials = async function (email, password){

    const user = await User.findOne({email})

    if (!user){
        throw new Error('Teacher not found')
    }
    const passwordMatch = await bcryptjs.compare(password, user.password)


    if (!passwordMatch){
        throw new Error('Password do not match')
    }

    return user
}


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