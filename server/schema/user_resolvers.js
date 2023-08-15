const User = require('./models/User'); // Import your Mongoose User model
const { createToken, validateToken } = require('./auth'); // Your authentication functions

const userResolvers = {
    Query: {
        authenticated: async (_, __, { req }) => {
            try {
                const token = req.cookies.token;

                if (!token) return null;

                const data = await validateToken(token);

                const user = await User.findById(data.user_id);

                return user;
            } catch (err) {
                return null;
            }
        },
    },
    Mutation: {
        register: async (_, { email, password }) => {
            try {
                const user = await User.create({ email, username, password });

                await createToken(user._id);

                return user;
            } catch (err) {
                throw new Error(err.message);
            }
        },
        login: async (_, { email, password }) => {
            try {
                const user = await User.findOne({ email });

                if (!user) throw new Error('A user with that email address does not exist');

                const valid_pass = await user.validatePass(password);

                if (!valid_pass) throw new Error('Password is incorrect');

                await createToken(user._id);

                return user;
            } catch (err) {
                throw new Error(err.message);
            }
        },
        logout: (_, __, { res }) => {
            res.clearCookie('token');
            return 'Logged out successfully';
        },
    },
};

module.exports = userResolvers;
