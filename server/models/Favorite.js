const { Schema, model } = require('mongoose');

const favoriteSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

const Favorite = model('Favorite', favoriteSchema);

module.exports = Favorite;
