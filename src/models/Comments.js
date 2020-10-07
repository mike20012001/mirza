const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const CommentSchema = mongoose.Schema({ 
            employee: {
                type: Schema.Types.ObjectId,
                ref: "Rating"
            },
            commentAuthor : {
                type: Schema.Types.ObjectId, 
                ref: 'User'
            },
            isDeleted: {
                type: Boolean,
                default: false
            },
            comments: [{
                comment: {
                    type: String,
                    required: true,
                    max: 1024,
                    min: 6
                },
                date: {
                    type: Date,
                    default: () => { return getCurrentDate() }
                }
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



module.exports = mongoose.model('Comments', CommentSchema, 'comments')