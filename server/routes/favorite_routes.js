
const router = require('express').Router();
const { isAuthenticated, validateToken } = require('../auth');
const { Team, User, Favorite, Pokemon, Move } = require('../models'); // Model imports

router.get('/favorite', isAuthenticated, async (req, res) => {
    console.log("Got into the get all favorites route.");
    try {
        const userId = req.user._id; // Assuming you have the user ID available from authentication

        // Find the user
        const user = await User.findById(userId).populate('favorites');

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.send({
            favorites: user.favorites,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});


// Create a pokemon that belongs to a favorite of the user
router.post('/favorite', isAuthenticated, async (req, res) => {
    console.log("Got into the post route for favorites to add a favorite.");
    try {
        const userId = req.user._id; // Assuming you have the user ID available from authentication
        const pokemonData = req.body; // Assuming the new Pokémon data is sent in the request body

        // Find the user
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send('User not found');
        }

        // Create a new Pokémon using the provided data
        const newPokemon = new Favorite(pokemonData);

        // Add the new Pokémon to the favorite's pokemon array
        user.favorites.push(newPokemon);

        // Save the related favorite to that user
        await user.save();

        res.send({
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

//route to delete a favorite from a user's list
router.delete('/favorite/:favoriteID', isAuthenticated, async (req, res) => {
    console.log("Got into the delete route for favorites.");
    try {
        const userId = req.user._id; // Assuming you have the user ID available from authentication
        const favoriteId = req.params.favoriteID;

        // Find the user
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send('User not found');
        }

        // Find the index of the favorite to delete within the user's favorites array
        const favoriteIndex = user.favorites.findIndex(fav => fav._id.toString() === favoriteId);

        if (favoriteIndex === -1) {
            return res.status(404).send('Favorite not found');
        }

        // Remove the favorite from the user's favorites array
        user.favorites.splice(favoriteIndex, 1);

        // Save the updated user
        await user.save();

        res.send({
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;