const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.createConnection);

const BoardSchema = mongoose.Schema({ 
            author: {
                type: Schema.Types.ObjectId,
                ref: 'User',
            required: true
                },
            username: {
                type: String,
                required: true
            },
            title: {
            type: String,
            required: true,
            max: 20,
            min: 3
                },
            contents: {
            type: String,
            required: true,
            max: 4096,
            min: 6
                },
            date: {
                type: Date,
                default: () => { return getCurrentDate() }
                },
            updatedAt: {
                type: Date
            },
            isDeleted: {
                type: Boolean,
                default: false
            },
            views: {
                type: Number,
                default: 0
            },
            likes: [{
                type: String,
            }],
            comment: [{
                username: { 
                    type: String 
                },
                useremail: { 
                    type: String 
                },
                comment: { 
                    type: String 
                },
                userId: {
                    type: Schema.Types.ObjectId,
                    ref: 'User'
                },
                createdAt: { 
                    type: Date,
                    default: () => { return getCurrentDate() }
                },
                isDeleted: {
                    type: Boolean,
                    default: false
                },
            }]
    }
);

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

BoardSchema.plugin(autoIncrement.plugin, {
    model: 'Board',
    field : 'seq',
    steartAt : 1, //시작 카운트
    increment : 1 // 증가값
})


module.exports = mongoose.model('Board', BoardSchema, 'board')