const Team = require('./models/Team'); // Import your Mongoose Team model
const User = require('./models/User'); // Import your Mongoose User model
const { isAuthenticated } = require('./auth'); // Your authentication function

const teamResolvers = {
    Mutation: {
        createTeam: async (_, __, { req }) => {
            isAuthenticated(req); // Authenticate the user
            try {
                // Create a new team
                const team = await Team.create({});

                // Find the user and update the user's teams array
                const user = await User.findByIdAndUpdate(
                    req.user._id,
                    {
                        $push: { teams: team._id },
                    },
                    { new: true }
                ).populate('teams');

                return user.teams;
            } catch (error) {
                console.error(error);
                throw new Error('Server Error');
            }
        },
        deleteTeam: async (_, { teamId }, { req }) => {
            isAuthenticated(req); // Authenticate the user
            try {
                const team = await Team.findById(teamId);

                if (!team) {
                    throw new Error('Team not found');
                }

                await team.remove();

                const user = await User.findByIdAndUpdate(
                    req.user._id,
                    {
                        $pull: { teams: teamId },
                    },
                    { new: true }
                ).populate('teams');

                return user.teams;
            } catch (error) {
                console.error(error);
                throw new Error('Server Error');
            }
        },
        editTeamName: async (_, { teamId, newTeamName }, { req }) => {
            isAuthenticated(req); // Authenticate the user
            try {
                const team = await Team.findById(teamId);

                if (!team) {
                    throw new Error('Team not found');
                }

                team.name = newTeamName;

                const updatedTeam = await team.save();

                return updatedTeam;
            } catch (error) {
                console.error(error);
                throw new Error('Server Error');
            }
        }
    },
};

module.exports = teamResolvers;