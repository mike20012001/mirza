const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const userSchema = mongoose.Schema({
    username : {
    type: String,
    required: true,
    min: 3,
    max: 30,
    unique: true
        },
    email: {
    type: String,
    required: true,
    max: 255,
    min: 6,
    unique: true
        },
    password: {
    type: String,
    required: true,
    max: 1024,
    min: 6
        },
    birth: {
    type: String,
    required: true,
    min: 4,
        },
    gender: {
    type: String,
    required: true,
    min: 1,
        },
    joinedAt: {
        type: Date,
        default: () => { return getCurrentDate() }
        },
    updatedAt: {
        type: Date
    },
    visits: {
        type: Schema.Types.ObjectId,
        ref: 'History'
    },
    resetLink: {
        data: String,
        default: ''
    },
    active: {
        type: String,
        default: true
    },
    resetLink: {
        data: String,
        default: ''
    }
});

function getCurrentDate(){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var today = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var milliseconds = date.getMilliseconds();
    return new Date(Date.UTC(year, month, today, hours, minutes, seconds, milliseconds));
}


module.exports = mongoose.model('User', userSchema, 'user')


