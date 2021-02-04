const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Teacher = require('../../src/v1/models/teachers')
const School = require('../../src/v1/models/schools')


const userId = new mongoose.Types.ObjectId
const teacherOne = {
  _id: userId,
  name: 'Naira',
  email: 'naira@marley.com',
  password: '2thisismyPass!!',
  tokens: [{
    token: jwt.sign({_id: userId}, 'thisisanencryptionstring')
  }]
}

const schoolId = new mongoose.Types.ObjectId
const schoolOne = {
    _id: schoolId,
    name: "Khan Academy",
    course: "All things beautiful",
    description: "we make learning fun",
    instructor: userId
}

const setupdb = async () => {
    await Teacher.deleteMany()
    await new Teacher(teacherOne).save()

    await School.deleteMany()
    await new School(schoolOne).save()
}


module.exports = {
    userId,
    teacherOne,
    setupdb,
    schoolId
}