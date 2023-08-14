const router = require('express').Router();
const { isAuthenticated, validateToken } = require('../auth');

const { Team, User, Favorite, Pokemon, Move } = require('../models'); // Model imports



/*** Team routes ***/

// Create a team
router.post('/team', isAuthenticated, async (req, res) => {
  try {
    // Create a new team
    const team = await Team.create({});

    // Find the user and update the user's teams array
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: { teams: team._id }, // Push the newly created team's ID
      },
      { new: true }
    ).populate('teams'); // Populate the 'teams' field for the user

    res.send({
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
