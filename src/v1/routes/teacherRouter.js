const express = require('express')
const Teacher = require('../models/teachers')
const teacherAuth = require('../helpers/teacherAuth')

const router = new express.Router()

router.post('/teachers', async (req, res) => {
    const teacher = new Teacher(req.body)
    try {
        const newTeacher = await teacher.save()
        const token = await teacher.getAuthToken()
        res.status(201).send({newTeacher, token})
    } catch (error) {
        res.sendStatus(500)
    }
})

router.post('/teachers/login', async (req, res) => {
    try {
        const teacher = await Teacher.findCredentials(req.body.email, req.body.password)
        const token = await teacher.getAuthToken()
        res.send({teacher, token})
    } catch (error) {
        res.sendStatus(400)
    }

})

router.get ('/teachers/me', teacherAuth, async (req, res) => {
    res.send(req.teacher)
})

router.patch('/teachers/me', teacherAuth, async (req, res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password']

    const isValidUpdate = updates.every(update => allowedUpdates.includes(update))

    if(!isValidUpdate){
        res.status(400).send({error: 'invalid update'})
    }

    try{

        const teacher = await Teacher.find({_id: req.teacher._id})
        if(!teacher){
            res.status(400).send('Teacher not found')
        }

        updates.forEach(update => {
            req.teacher[update] = req.body[update]
        })        

        req.teacher.save()

        res.send(req.teacher)


    }catch(error){

    }


})

router.post('/teachers/logout', teacherAuth, async (req, res) => {
    try{
        req.teacher.tokens = req.teacher.tokens.filter(token => token.token !== req.token)
        await req.teacher.save()
        res.send()
    }catch(error){
        res.status(500).send()
    }
})

router.post('/teachers/logoutAll', teacherAuth, async (req, res) => {
    try {
        req.teacher.tokens = []
        await req.teacher.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

router.delete('/teachers/me', teacherAuth, async (req, res) => {
    try {
        await req.teacher.remove()
        res.send(req.teacher)
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router