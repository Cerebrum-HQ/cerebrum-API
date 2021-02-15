const express = require('express')
const User = require('../models/users')
const userAuth = require('../helpers/userAuth')

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

router.post ('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials (req.body.email, req.body.password)
        const token = await user.getAuthToken()
        res.send({
            user,
            token
        })
    }catch (e) {
        res.status(400).send()
    }

})

router.get ('/users/me', userAuth, async (req, res) => {
    res.send(req.user)
})

router.post ('/users/logout', userAuth, async (req, res) => {
    
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()
        res.send()

    }catch(e) {
        res.status(500).send()
    }
})

router.post ('/users/logoutAll', userAuth, async (req, res) =>{
    try{

        req.user.tokens = []

        await req.user.save()

        res.send()

    }catch(e){
        res.status(500).send()
    }
})


router.patch('/users/me', userAuth,  async (req, res) =>{

    const updates = Object.keys(req.body)
    const allowedUpdated = ['name', 'password', 'email']
    const isValidOperation = updates.every(update => allowedUpdated.includes(update) )

    if (!isValidOperation){
        res.status(400).send({'error': 'Invalid update'})
    }

    try {

        const user = await User.findById(req.user._id)

        if (!user){
            res.status(404).send()
        }

        updates.forEach((update) =>{
            req.user[update] = req.body[update]
        })

        req.user.save()

        res.send(req.user)
        
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/users/me', userAuth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (error) {
        res.status(500).send(error)
    }
})



module.exports = router