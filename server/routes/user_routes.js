const { createToken, validateToken } = require('../auth');

/***  User routes ***/
// Register user
router.post('/register', async (req, res) => {
    try {
      const user = await User.create(req.body);
  
      const token = await createToken(user._id);
  
      res.cookie('token', token, {
        httpOnly: true
      });
  
      res.send({
        user
      });
  
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
    try {
      const user = await User.findOne({
        email: req.body.email
      });
  
      if (!user) throw new Error('A user with that email address does not exist');
  
      const valid_pass = await user.validatePass(req.body.password);
  
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
    res.clearCookie('token');
    res.send('Logged out successfully');
  });