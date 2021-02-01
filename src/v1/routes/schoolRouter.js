const express = require('express')
const School = require('../models/schools')
const teacherAuth = require('../helpers/teacherAuth')
const Teacher = require('../models/teachers')

const router = new express.Router()

router.post('/school/create-school', teacherAuth, async (req, res) => {
    const school = new School({
        ...req.body,
        instructor: req.teacher._id
    })

    try {
        const newSchool = await school.save()
        res.status(201).send(newSchool)
    } catch (error) {
        res.sendStatus(400)
    }
})


router.get('/school', teacherAuth, async (req, res) => {

    try {

        await req.teacher.populate({
            path: 'schools'
        }).execPopulate()

        res.status(200).send(req.teacher.schools)
        
    } catch (error) {
        res.sendStatus(400)
    }
})

router.get('/school/:id', teacherAuth, async (req, res) => {
    const id = req.params.id

    try {
        const school = await School.findOne({
            _id: id,
            instructor: req.teacher._id
        })

        if (!school){
            res.status(404).send({error: 'No school found'})
        }

        res.send(school)

    } catch (error) {
        res.sendStatus(500)
    }
})

router.patch('/school/:id', teacherAuth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'course', 'description']

    const isValidUpdate = updates.every(update => allowedUpdates.includes(update))

    if (!isValidUpdate){
        res.status(400).send({error: 'invalid update'})
    }

    try {
        const school = await School.findOne({_id: req.params.id, instructor: req.teacher._id})

        if (!school){
            res.status(404).send({error: 'nothing came back'})
        }

        updates.forEach(update => {
            school[update] = req.body[update]
        })

        await school.save()

        res.status(200).send(school)

    } catch (error) {
        res.sendStatus(500)
    }
})

router.delete('/school/:id', teacherAuth, async (req, res) => {
    try {
        const school = await School.findOneAndDelete({_id: req.params.id, instructor: req.teacher._id})
        if (!school){
            return res.status(404).send({error: `School with ${req.params.id} not found`})
        }

        res.send(school)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router