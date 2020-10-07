const express = require('express');
const router = express.Router();
const Company = require('../models/Company')
import authenticate from '../middlewares/authenticate'

//const verify = require('./verifyToken');



//get back all the posts
router.get('/', async (req, res) => {
    console.log(req.params)
    try{
        const company = await Company.find().limit(50);
        res.json(company);
    }catch(err){
        res.json({message: err})
    }
});

router.post('/', async (req, res) => {
    console.log(req.body.body)
    let hey = req.body.body
    try{
        const company = await Company.find({corp_name: new RegExp(hey, "i")}, function(err, result) {

            if(err) {
                res.send(err)
            } else {
                res.json(result)
            }
        }).limit(30)
    }catch(err){
        res.json({message: err})
    }
});


//submits a post
router.post('/reg', authenticate, async (req,res)=> {
    console.log(req.body)
    console.log(req.currentUser)
    const company = new Company({
        corp_name: req.body.corp_name,
        ceo_nm: req.body.ceo_nm,
        adres: req.body.adres,
        phn_no: req.body.phn_no,
        bizr_no: req.body.bizr_no,
        author: req.currentUser.id

    });
    try{
    const savedCompany = await company.save();
    res.json('success')
}catch(err){
    res.json({message: err})
}
});

//specific post
router.get('/:companyID', async (req, res) => {
//    console.log(req.params)
    try{
    const company = await Company.findById(req.params.companyID)
    res.json(company);
    }catch(err){
        res.json({message:err})
    }
})

//delete post
router.delete('/:companyID', async (req, res) => {
    try{
    const removedCompany = await Company.remove({_id: req.params.companyID});
    res.json(removedCompany);
    }catch(err){
        res.join({message:err})
    }
});

//update a post
router.patch('/:postID', async (req, res) => {
    try{
        const updatedCompany = await Company.updateOne(
            {_id: req.params.postID},
            { $set: {company: req.body.company}}
            );
            res.json(updatedCompany);
    }catch(err){
        res.json({message:err})
    }

})

module.exports = router;

