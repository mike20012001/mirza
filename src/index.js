// main entrypoint
import express from 'express';
import bodyParser from 'body-parser';

import users from './routes/users';
import auth from './routes/auth';
import events from './routes/events';
import companyRoute from './routes/company';
import boardRoute from './routes/board';
import qnaRoute from './routes/qna';
import ratingRoute from './routes/rating';
import myInfoRoute from './routes/myinfo';
import mailerRoute from './routes/mailer';
import reportRoute from './routes/report';
import forgotPasswordRoute from './routes/forgotPassword';
import resetPasswordRoute from './routes/resetPassword';

const io = require('socket.io')(5000)

const cors = require('cors');

const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config()

app.use(cors());

//app.use((req, res, next) => {
//    res.setHeader("Access-Control-Allow-Origin", "*");
//    res.setHeader("Access-Control-Allow-Headers", "*")
//    next()
//});


app.use(bodyParser.json());

app.use('/api/users', users);            // 로그인 & 회원가입
app.use('/api/auth', auth);              // 로그인 auth
app.use('/api/events', events);          // 이벤트 글 등록 
app.use('/api/company', companyRoute);   // 회사 검색
app.use('/freeboard', boardRoute);       // 자유게시판
app.use('/qna', qnaRoute);             // 질문게시판
app.use('/api/rating', ratingRoute)
app.use('/user/myinfo', myInfoRoute)
app.use('/api/rating/postedemployees/board', ratingRoute)
app.use('/query', mailerRoute)
app.use('/report', reportRoute)
app.use('/forgot-password', forgotPasswordRoute)
app.use('/reset-password', resetPasswordRoute)



//connect to db
mongoose.connect(
    process.env.DB_CONNECTION,{
        useNewUrlParser: true,
        useUnifiedTopology: true, 
        useCreateIndex: true
//        serverSelectionTimeoutMS: 5000
    })

const db = mongoose.connection;

io.on('connection', socket => {
    const id = socket.handshake.query.id
    socket.join(id)

    socket.on('send-message', ({ recipients, text}) => {
        recipients.forEach(recipient => {
            const newRecipients = recipients.filter(r => r !== recipient)
            newRecipients.push(id)
            socket.broadcast.to(recipient).emit('receive-message', {
                recipients: newRecipients, sender: id, text
            })
        })
    })
})


app.listen(8000, () => console.log('running on localhost:8000'));
