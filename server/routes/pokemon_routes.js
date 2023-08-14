const router = require('express').Router();
const { isAuthenticated, validateToken } = require('../auth');

const { Team, User, Favorite, Pokemon, Move } = require('../models'); // Model imports
