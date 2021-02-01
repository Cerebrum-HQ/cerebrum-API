const jwt = require('jsonwebtoken')
const Teacher = require('../models/teachers')

const teacherauth = async (req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'thisisanencryptionstring')
        const teacher = await Teacher.findOne({_id: decoded._id, 'tokens.token': token})

        if(!teacher){
            throw new Error
        }

        req.teacher = teacher
        req.token = token

        next()
    }catch(error){
        res.status(401).send('Please authenticate')
    }
}

module.exports = teacherauth