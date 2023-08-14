const { Schema, model } = require('mongoose');

const favoriteSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    }
});

const Favorite = model('Favorite', favoriteSchema);

module.exports = Favorite;
