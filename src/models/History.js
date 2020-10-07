const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const HistorySchema = mongoose.Schema({ 
            dateLogin: {
                type: Date,
                default: () => { return getCurrentDate() }
            },
            ip : {
                type: String,
                required: true
            },
            userName: {
                type: String,
                required: true
            },
            userId: {
                type: String,
                required: true,
            },
            userEmail: {
                type: String,
                required: true
            }            
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


module.exports = mongoose.model('History', HistorySchema, 'history')