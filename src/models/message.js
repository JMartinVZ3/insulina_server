const { Schema, model } = require('mongoose');

const MessageSchema = Schema({

    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});



module.exports = model('Message', MessageSchema);