const mongoose = require('mongoose');

// schema

const CounterSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Counter', CounterSchema, 'counters')
