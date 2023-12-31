
const router = require('express').Router();
const { createToken, validateToken, isAuthenticated } = require('../auth');
const { Team, User, Favorite, Pokemon, Move } = require('../models'); // Model imports

/***  User routes ***/

// Get the logged-in user's data including populated teams
router.get('/user', isAuthenticated, async (req, res) => {
  try {
    // Find the logged-in user and populate the 'teams' field
    const user = await User.findById(req.user._id).populate('teams');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Send the populated user data as the response
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Register user
router.post('/register', async (req, res) => {
  console.log("Got into the register route for a user.");
  try {
    const user = await User.create(req.body);

    const token = await createToken(user._id);

    res.cookie('token', token, {
      httpOnly: true
    });


    res.send({ user });

  } catch (err) {
    console.log(err);
    res.status(401).send({
      error: true,
      message: err.message
    });
  }
});

// Login User
router.post('/login', async (req, res) => {
  console.log("Got into the login user post route.");
  try {
    const { identifier, password } = req.body;

    // Find a user with the given identifier (either email or username)
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }]
    });

    if (!user) throw new Error('A user with that email or username does not exist');

    const valid_pass = await user.validatePass(password);

    if (!valid_pass) throw new Error('Password is incorrect');

    // User is verified
    const token = await createToken(user._id);

    res.cookie('token', token, { httpOnly: true });

    res.send({ user });
  } catch (err) {
    console.log(err);
    res.status(401).send({
      error: true,
      message: err.message
    });
  }
});


// Check if user is logged in
router.get('/authenticated', async (req, res) => {
  console.log("Got into the /authenticated route to check if a user is logged in.");
  try {
    const token = req.cookies.token;

    if (!token) return res.send({ user: null });

    const data = await validateToken(token);

    const user = await User.findById(data.user_id);

    res.send({ user });
  } catch (err) {
    res.send({
      user: null
    });
  }
});

// Log out user
router.get('/logout', (req, res) => {
  console.log("Got into the logout route");
  res.clearCookie('token');
  res.send('Logged out successfully');
});

module.exports = router;