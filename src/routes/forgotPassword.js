import User from '../models/User';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import History from '../models/History'
import { json } from 'body-parser';
import authenticate from '../middlewares/authenticate'

const router = require('express').Router();
const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'scheme.mike@gmail.com',
        pass: 'alci139121!'
    }
});

router.post('/', async (req, res) => {
    const {email} = req.body;
    console.log({email})

    User.findOne({email}, (err, user) => {
        if(err || !user) {
            return res.status(400).json({error: "등록된 이메일이 아닙니다."})
        }

        const token = jwt.sign({_id: user._id}, process.env.RESET_PASSWORD_KEY, {expiresIn: '20m'});
        console.log(user.email)

        return user.updateOne({resetLink: token}, function(err, success) { 
            console.log(user)
            if(err) {
                return res.status(400).json({error: "비밀번호 초기화 링크 에러"})
            } else {
                let mailOptions = {
                    from: 'noreply',
                    to: user.email,
                    subject: '비밀번호 재설정 이메일',
                    text: `
                    하단의 링크를 클릭하시면 비밀번호 재설정이 가능합니다.
                    ${process.env.CLIENT_URL}/reset-password/${token}
                    `
                };
        
                    transporter.sendMail(mailOptions, function(err,info) {
                        if(err) {
                            console.log(err);
                        } else {
                            res.status(200).json('메일발송완료')
                         //   console.log('email sent' + info.response)
                        }
                    })
                    return res.json({message: 'email has been sent'})
                }
                }

        )
        
    })
})


export default router;
