const express = require('express');
const router = require('express').Router();
const mongoose = require('mongoose')
const Mail = require('../models/Mail')

router.get('/', (req, res) => {
    res.status(200).send('hello')
})

router.post('/', async (req, res) => {
    console.log(req.body)
    const mailSender = req.body;

    await Mail.create(mailSender, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(`new mail sent: \n ${data}`)
        }
    })
})


export default router;
