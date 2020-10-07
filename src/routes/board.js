const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
import authenticate from '../middlewares/authenticate'
const Board = require('../models/Board')
const User = require('../models/User')
const FreeboardComment = require('../models/FreeboardComment')

function getCurrentDate(){
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let today = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let milliseconds = date.getMilliseconds();
    return new Date(Date.UTC(year, month, today, hours, minutes, seconds, milliseconds));
}


//get back all the posts
router.get('/', async (req, res) => {
    try{
        const board = await Board.find({isDeleted:false}).sort({"date": -1});
        res.json(board);
    }catch(err){
        res.json({message: err})
    }
});


//get back all the posts
router.get('/newposts', async (req, res) => {
    try{
        const board = await Board.find({isDeleted:false}).sort({"date": -1}).limit(5);
        res.json(board);
    }catch(err){
        res.json({message: err})
    }
});


//get specific the posts
router.get('/thread/:id', async (req, res) => {
    const board = await Board.findById(req.params.id);
    board.views++;
    board.save();
    try{
        res.json(board);
    }catch(err){
        res.json({message: err})
    }
});

//좋아요
router.post('/thread/:id', authenticate, async (req,res)=> {
    console.log(req.currentUser)
    const post = await Board.findById(req.params.id)
    if (!post.likes.includes(req.currentUser.email)) { 
    await post.updateOne({
        $push :
        {likes: req.currentUser.email}}
    )
    res.json({message: "success"})
    } else {
        res.json("Duplicate")    
    }
});

//submits a post
router.post('/post', authenticate, async (req,res)=> {
    console.log(req.currentUser.name)
    console.log(req.body)
    const post = new Board({
        author: req.currentUser.id,
        username: req.currentUser.name,
        title: req.body.title,
        contents: req.body.contents
    });
    try{
    const savedPost = await post.save();
    res.json(savedPost)
}catch(err){
    res.json({message: err})
}
});

// 댓글 등록
router.post('/post/comment', authenticate, async (req,res)=> {
    console.log(req.currentUser)
    console.log(req.body)
    const comment = await Board.findById(req.body.freeboardThread)
    await comment.updateOne({
        $push :
        {
            comment: { comment : req.body.comment,
            username: req.currentUser.name,
            useremail: req.currentUser.email,
            userId: req.currentUser.id }
        }
        })
        try{
        res.json({message: "요청처리 완료"})
        } catch(err) {
            res.json("에러")    
        }
    
    });


// 댓글 삭제
router.post('/thread/:id/:commentId', authenticate, async (req,res)=> {
    console.log(req.params)
    const board = await Board.findOne({_id:req.params.id}, function(err, findComment) {
        if (err) return res.status(500).json(err)
        const comment = findComment.comment.id(req.params.commentId);
        comment.isDeleted = true;
        findComment.save()
        console.log(comment)
    })
});




router.post('/', authenticate, async (req, res) => {
    console.log(req.body)
    try{
        await Board.updateOne({_id:req.body.postId}, {title:req.body.title, contents: req.body.contents, updatedAt: getCurrentDate()}, function (err, docs) {
            if (err) {
                console.log(err)
            } else {
                console.log("업데이트: ", docs)
            }
        })  
    } catch (err){
        res.json(err)
    }
})

//specific post
router.get('/:postID', async (req, res) => {
    try{
    const adduser = await Adduser.findById(req.params.postID)
    res.json(adduser);
    }catch(err){
        res.json({message:err})
    }
})


//update a post
router.patch('/:postID', async (req, res) => {
    try{
        const updatedAddUser = await AddUser.updateOne(
            {_id: req.params.postID},
            { $set: {nickname: req.body.nickname}}
            );
            res.json(updatedAddUser);
    }catch(err){
        res.json({message:err})
    }

})

module.exports = router;

