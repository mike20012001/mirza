import User, { bulkWrite } from '../models/User.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../../config.js'
import History from '../models/History.js'

const router = require('express').Router();

router.post('/', async (req, res) => {
    console.log(req.body)
    const { identifier, password, ip } = req.body;
    const userpass = await User.findOne({
        $or: [
        {username: req.body.identifier},
        {email: req.body.identifier}
            
        ]})

    return await User.find().select(['username', 'email'])

    .where({
        $or: [
            {username: identifier}, 
            {email: identifier}
        ]
    })
    .then(user => {
        if (userpass !== null) {
            if (userpass.active === 'false') {
                res.status(401).json({ errors: { form: "탈퇴한 계정"}})
            } else 
            if (bcrypt.compareSync(password, userpass.password)) {
                History.create({
                    userName: userpass.username,
                    userId: userpass._id,
                    userEmail: userpass.email,
                    ip: req.body.ip
                });
                const token = jwt.sign({
                    id: userpass._id,
                    name: userpass.username,
                    email: userpass.email
                }, config.jwtSecret)
                res.json({ token })
            } else {
                res.status(401).json({ errors: { form: '아이디 혹은 비밀번호 입력이 잘못되었습니다.'}})
            } 
        } else {
            res.status(401).json({ errors: { form: '아이디 혹은 비밀번호 입력이 잘못되었습니다.'}})
        }
    })

});

export default router;




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