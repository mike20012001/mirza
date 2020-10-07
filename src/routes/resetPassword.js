import User from '../models/User';
import jwt from 'jsonwebtoken'
const bcrypt = require('bcrypt');
const _ = require('lodash')


const router = require('express').Router();

router.post('/', async (req, res) => {   // 리셋 token 링크를 받은후 처리 함수
    const {resetLink, newPass} = req.body;
 //   console.log(req.body)
    const salt = bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hashSync(req.body.newPass, 10)

    if (resetLink) { 
        jwt.verify(resetLink, process.env.RESET_PASSWORD_KEY, function(err, decodedData) {
            if (err) {
                return res.status(401).send({error: "잘못된 토큰이거나, 만료된 토큰입니다."})
            }
        User.findOne({resetLink}, (err, user) => {
            if (err || !user) {
               return res.status(401).json({error: "만료된 토큰 혹은 유저정보 불일치."})
            }
            const obj = {
                password: hashedPassword,
                resetLink: ''
            }

            user = _.extend(user, obj);
            user.save((err, result) => {
                if(err) {
                    return res.status(400).json({error: "비밀번호 초기화 에러"});
                } else {
                    return res.status(200).json({message: '비밀번호 변경완료'})
                }
            })
        })
        })
    } else {
        return res.status(401).json({error:'인증중에 에러가 발생하였습니다.'})
    }

})


export default router;
