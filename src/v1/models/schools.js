const mongoose = require('mongoose')
const { Schema } = mongoose

const schoolSchema = new Schema({
    name:{
        type: String,
        required: true,
        lowercase: true,
        validate(value){
            if(value.length < 4){
                throw new Error('check lenght of name')
            }
        }
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId
    },
    course: {
        type: String,
        required: true,
        lowercase: true

    },
    description:{
        type: String,
        required: true,
        ref: 'Teacher'
    }
})

const School =  mongoose.model('School', schoolSchema)

module.exports = School