import mongoose, { Schema } from 'mongoose'


const ReportSchema = mongoose.Schema ({
    reporter:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    reportee:{
        type: String
    },

    title:{
        type: String
    },

    path:{
        type: String
    },
    
    timestamp:{
        type: Date,
        default: () => { return getCurrentDate() }
    }
})


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

module.exports = mongoose.model('Report', ReportSchema, 'report')