const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const RatingSchema = mongoose.Schema({ 
            nickName : {
                type: String,
                required: true,
                min: 1,
                max: 30
            },
            department: {
                type: String,
                required: true,
                max: 255,
                min: 6
            },
            virtue: {
                type: String,
                required: true,
                max: 1024,
                min: 6
            },
            ratings: [{
                rating: {
                    type: Number,
                    required: true
                },
                userid: {
                    type: String,
                },
                username: {
                    type: String,
                },
                useremail: {
                    type: String,
                }
            }],
            isDeleted: {
                type: Boolean,
                default: false
                },    
            date: {
                type: Date,
                default: () => { return getCurrentDate() }
                },
            company: {type: Schema.Types.ObjectId, ref: 'Company'},
            author: {type: Schema.Types.ObjectId, ref: 'User'},
            comment: [{
                userid: {
                    type: String,
                    required: true
                },
                username: {
                    type: String,
                    required: true
                },
                useremail: {
                    type: String,
                    required: true
                },
                comment: {
                    type: String,
                    required: true
                },
                isDeleted: {
                    type: Boolean,
                    default: false
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


module.exports = mongoose.model('Rating', RatingSchema, 'ratings')