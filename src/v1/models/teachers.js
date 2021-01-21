const mongoose = require ('mongoose')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const validator = require('validator')
const { Schema } = mongoose

const teacherSchema = new Schema({
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


teacherSchema.methods.getAuthToken = async function (){
    const teacher = this

    const token = jwt.sign({_id: teacher._id.toString()}, 'thisisanencryptionstring')
    teacher.tokens = teacher.tokens.concat({token})
    await teacher.save()

    return token

}

teacherSchema.pre('save', async function(next){
    const teacher = this

    if (teacher.isModified('password')){
        teacher.password = await bcryptjs.hash(teacher.password, 8)
    }

    next()
})

const Teacher = mongoose.model('Teacher', teacherSchema)

module.exports = Teacher