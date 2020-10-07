const router = require('express').Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const isEmpty = require('lodash/isEmpty')

import commonValidation from '../shared/validations/signup';

const User = require('../models/User');




function validateInput(data, otherValidations) {
    let { errors } = otherValidations(data);
        
    return User.find({
        $or:[
            {username: data.username},
            {email: data.email}
        ]
        })
        .then(user => {
            if (user.length) {
                if (user[0].username === data.username) {
                errors.username = '사용중인 아이디입니다.';
                }  
                if (user[0].email === data.email) {
                errors.email = '사용중인 이메일입니다.';
                }
            }
        return {
            errors,
            isValid: isEmpty(errors)
        }
    })
    }

router.post('/', (req, res) => {

    const salt = bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)

    validateInput(req.body, commonValidation).then(({errors, isValid}) => {
    if (isValid) {
        const newuser = new User ({
            username: req.body.username,
            email: req.body.email, 
            password: hashedPassword,
            gender: req.body.gender,
            birth: req.body.birth,
            active: true
        });
        newuser.save()
        .then(newuser => res.send({ 
            user: newuser.username,
            email: newuser.email
            //success:true
        }))
        .catch(err => res.status(500).json({error: err}))
    //    console.log(saveUser)
        } else {
        res.status(400).json(errors);
    }
});
})


export default router;