const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Comments = require('../models/Comments.js')
const Rating = require('../models/Rating.js');
const Company = require('../models/Company.js');
const User = require('../models/User.js');
import authenticate from '../middlewares/authenticate.js'

    //전체 회사에 등록된 직원
router.get('/', async (req, res) => {
    try{
        const rating = await Rating.find().sort({"date": -1})
        res.json(rating);
    }catch(err){
        res.json({message: err})
    }
});

    //전체 회사에 등록된 직원
    router.get('/newposts', async (req, res) => {
        try{
            const rating = await Rating.find().sort({"date": -1}).limit(5).populate('company')
            res.json(rating);
        }catch(err){
            res.json({message: err})
        }
    });
    



//전체 회사에 등록된 직원과 직원들의 코멘트
router.get('/rating/', async (req, res) => {
    try{
        const rating = await Rating.find().sort({"date": -1})
        .populate({
            path: "comment",
            model: Comments
        });
        res.json(rating);
        console.log(rating)
    }catch(err){
        res.json({message: err})
    }
});

//get a specific Posted Employee by Company ID.
router.get('/postedemployees/:id', async (req, res) => {
    try{
        const rating = await Rating.find({company: req.params.id}).sort({"date": -1});
        res.json(rating);
    }catch(err){
        res.json({message: err})
    }
});


//get a specific Posted Employee by Posted ID.
router.get('/postedemployees/board/:id', async (req, res) => {
    console.log(req.params.id)
    try{
        const rating = await Rating.findOne({_id: req.params.id}).sort({"date": -1})
        res.json(rating);
        }catch(err){
        res.json({message: "error"})
    }
});

//submits a post


router.post('/postemployee', authenticate, async (req,res)=> {
    console.log(req.currentUser)
    const ratings = new Rating({
        nickName: req.body.nickName,
        department: req.body.department,
        virtue: req.body.virtue,
        ratings: {
            rating: req.body.rating,
            userid: req.currentUser.id,
            username: req.currentUser.name,
            useremail: req.currentUser.email
        },
        company: req.body.company,
        author: await User.findOne({_id: req.currentUser.id})
    });
    try{
    const savedAddeduser = await ratings.save();
    res.status(200).json(savedAddeduser)
}catch(err){
    res.json({message: err})
}
});



//Rating 댓글
router.post('/comment', authenticate, async (req,res)=> {
    console.log(req.currentUser)
    console.log(req.body)
    const comment = await Rating.findById(req.body.ratingId)
    await comment.updateOne({
        $push :
        {
            comment: { comment : req.body.ratingcomment,
            userid: req.currentUser.id,
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


// 별점 추가
router.post('/addrating', authenticate, async (req,res)=> {
    console.log(req.currentUser)
    console.log(req.body)
    const rating = await Rating.findById(req.body.employeeId)
    console.log(rating)
    await rating.updateOne({
        $push :
        {
            ratings:{ 
                rating : req.body.rating,
                userid: req.currentUser.id,
                username: req.currentUser.name,
                useremail: req.currentUser.email
            }
        }
        })
        try{
        res.json("success")
        } catch(err) {
            res.json("error")    
        }
    });

//get a specific Posted Employee by Posted ID.
router.get('/comment/:id', async (req, res) => {
    console.log(req.params.id)
    try{
        const rating = await Rating.findById({_id: req.params.id}).sort({"createdAt": -1})
        res.json(rating.comment);
        }catch(err){
        res.json({message: "error"})
    }
});




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

