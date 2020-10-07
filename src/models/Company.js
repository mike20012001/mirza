const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const CompanySchema = mongoose.Schema({
    corp_code : {
        type: String
    },
    corp_name : {
        type: String,
        required: true
    },
    corp_name_eng: {
        type: String,
    },
    stock_code: {
        type: String
    },
    ceo_nm : {
        type: String,
        required: true
    },
    adres : {
        type: String,
        required: true
    },
    phn_no : {
        type: String,
    },
    hm_url : {
        type: String,
    }, 
    bizr_no: {
        type: String,
    },
    date: {
        type: Date,
        default: () => { return getCurrentDate() }
    },
    author: {type: Schema.Types.ObjectId, ref: "User"}

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


module.exports = mongoose.model('Company', CompanySchema, 'test') 