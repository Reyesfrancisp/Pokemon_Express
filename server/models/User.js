const { Schema, model, Types } = require('mongoose');
const { hash, compare } = require('bcrypt');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (email) {
                // Define a regular expression for email validation
                const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
                return emailRegex.test(email);
            },
            message: 'Invalid email format'
        }
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters in length']
    },
    favorites: [
        {
            type: Types.ObjectId,
            ref: 'Planet'
        }
    ]
}, {
    methods: {
        validatePass: async function (formPassword) {
            const is_valid = await compare(formPassword, this.password);

            return is_valid;
        }
    },
    toJSON: {
        virtuals: true,
        transform: function (_, user) {
            delete user.password;
        }
    },
    virtuals: {
        favAmount: {
            get() {
                return this.favorites.length;
            }
        }
    }
});

userSchema.pre('save', async function (next) {
    if (!this.created) {
        this.password = await hash(this.password, 10);
        next();
    }
});

userSchema.index({ username: 1 }, { unique: true });

const User = model('User', userSchema);

module.exports = User;