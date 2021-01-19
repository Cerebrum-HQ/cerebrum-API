const express = require('express')
const User = require('../models/users')

const router = new express.Router()


router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        const newUser = await user.save()
        const token = await user.getAuthToken()
        res.status(201).send({user})
    } catch (error) {
        res.status(400).send(error)
    }
})


module.exports = router