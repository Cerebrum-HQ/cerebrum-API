const express = require('express')
const Teacher = require('../models/teachers')

const router = new express.Router()

router.post('/teachers', async (req, res) => {
    const teacher = new Teacher(req.body)

    try {
        const newTeacher = await teacher.save()
        const token = await teacher.getAuthToken()
        res.status(201).send({newTeacher})
    } catch (error) {
        res.sendStatus(500)
    }
})

module.exports = router