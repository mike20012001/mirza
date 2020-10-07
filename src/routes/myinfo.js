const express = require('express');
const router = require('express').Router();
const mongoose = require('mongoose')
import authenticate from '../middlewares/authenticat.jse'
const Board = require('../models/Board.js')
const User = require('../models/User.js')
const FreeboardComment = require('../models/FreeboardComment.js')
const Comments = require('../models/Comments.js')
const Rating = require('../models/Rating.js')
const History = require('../models/History.js')



// User Info
router.get('/', authenticate, async (req, res) => {
    const userDetail = req.currentUser
    const history = await History.find({userId:req.currentUser.id})
    const visits = history.length
    const userPost = await Board.find({
        $and: [
            {author:req.currentUser.id},
            {isDeleted:false}
        ]}).sort({"date":-1})

    const myinfo = {userDetail, userPost, visits}
    console.log(myinfo)
    try {
        res.json(myinfo)
    } catch(err) {
        res.json("Error")    
    }
});


router.post('/deactivate', authenticate, async (req, res) => {
    const userDetail = req.currentUser
    console.log(req.currentUser)
    await User.findOne({_id:req.currentUser.id}, function(err, deactivate) {
        if(err) return res.json(err);
    deactivate.active = false;
    deactivate.save() 
    })})


export default router;

