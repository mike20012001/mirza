const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const FreeboardCommentSchema = mongoose.Schema({ 
            freeboardThread: {
                type: String,
                ref: "Board"
            },
            commentAuthor : {
                type: Schema.Types.ObjectId, 
                ref: 'User'
            },
            username: {
                type: String
            },
            email : {
                type: String
            },
            comment: {
                type: String,
                required: true,
                max: 1024,
                min: 6
            },
            isDeleted: {
                type: Boolean,
                default: false
            },
            date: {
                type: Date,
                default: () => { return getCurrentDate() }
            }

        }
);


module.exports = mongoose.model('FreeboardComment', FreeboardCommentSchema, 'freeboardcomments')