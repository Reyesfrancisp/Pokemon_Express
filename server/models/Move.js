const { Schema, model } = require('mongoose');

const moveSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
});

const Move = model('Move', moveSchema);

module.exports = Move;
