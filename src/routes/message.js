const router = require('express').Router();
const mongoose = require('mongoose')
const Messages = require('../models/Message.js')
const Pusher = require('pusher');

import authenticate from '../middlewares/authenticate.js'


router.get('/', authenticate, async (req, res) => {
    res.status(200).send('hello')
})


router.get('/sync', (req, res) => {

    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })     
})


router.post('/new', (req, res) => {
    const dbMessage = req.body

    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(`new message created: \n ${data}`)
        }
    })
    
})


export default router;