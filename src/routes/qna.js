const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
import authenticate from '../middlewares/authenticate'
const QnA = require('../models/QnA')
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
        const qna = await QnA.find({isDeleted:false}).sort({"date": -1});
        res.json(qna);
    }catch(err){
        res.json({message: err})
    }
});


//get back all the posts
router.get('/newposts', async (req, res) => {
    try{
        const qna = await QnA.find({isDeleted:false}).sort({"date": -1}).limit(5);
        res.json(qna);
    }catch(err){
        res.json({message: err})
    }
});


//get specific the posts
router.get('/thread/:id', async (req, res) => {
    const qna = await QnA.findById(req.params.id);
    qna.views++;
    qna.save();
    try{
        res.json(qna);
    }catch(err){
        res.json({message: err})
    }
});

//좋아요
router.post('/thread/:id', authenticate, async (req,res)=> {
    console.log(req.currentUser)
    const post = await QnA.findById(req.params.id)
    if (!post.likes.includes(req.currentUser.email)) { 
    await post.updateOne({
        $push :
        {likes: req.currentUser.email}}
    )
    res.json({message: "success"})
    } else {
        res.json("Duplicate")    
    }
//    post.likes++

});

//submits a post
router.post('/post', authenticate, async (req,res)=> {
    console.log(req.currentUser.name)
    console.log(req.body)
    const post = new QnA({
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


router.post('/post/comment', authenticate, async (req,res)=> {
    console.log(req.currentUser)
    console.log(req.body)
    const comment = await QnA.findById(req.body.qnaPost)
    await comment.updateOne({
        $push :
        {
            comment: { comment : req.body.comment,
            username: req.currentUser.name,
            useremail: req.currentUser.email }
        }
        })
        try{
        res.json({message: "success"})
        } catch(err) {
            res.json("Error")    
        }
    
    });


// 댓글 삭제
router.post('/thread/:id/:commentId', authenticate, async (req,res)=> {
    console.log(req.params)
    const board = await QnA.findOne({_id:req.params.id}, function(err, findComment) {
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
        await QnA.updateOne({_id:req.body.postId}, {title:req.body.title, contents: req.body.contents, updatedAt: getCurrentDate()}, function (err, docs) {
            if (err) {
                console.log(err)
            } else {
                console.log("updated docs: ", docs)
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

//delete post
router.delete('/:postID', async (req, res) => {
    try{
    const removedAdduser = await AddUser.remove({_id: req.params.postID});
    res.json(removedAdduser);
    }catch(err){
        res.join({message:err})
    }
});

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

