

const { User} = require('../models'); // Model imports
const { createToken } = require('../auth'); // Your authentication functions

const userResolvers = {
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
