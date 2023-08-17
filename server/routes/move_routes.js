
const router = require('express').Router();
const { isAuthenticated, validateToken } = require('../auth');
const { Team, User, Favorite, Pokemon, Move } = require('../models'); // Model imports

function checkUniqueMove(moves, moveName, moveType) {
    if (!moveName || !moveType) {
        return true; // Allow null move
    }

    const duplicateMoves = moves.filter(move =>
        move !== undefined &&
        move !== null &&
        move.name === moveName &&
        move.type === moveType
    );

    return duplicateMoves.length === 0;
}


// Endpoint to get moves for a specific Pokémon by its ID
router.post('/getPokemonMoves', async (req, res) => {
    try {
        const { pokemonID } = req.body;
        const pokemon = await Pokemon.findOne({ _id: pokemonID });

        const moves = await Promise.all([
            pokemon.move1 ? Move.findById(pokemon.move1) : null,
            pokemon.move2 ? Move.findById(pokemon.move2) : null,
            pokemon.move3 ? Move.findById(pokemon.move3) : null,
            pokemon.move4 ? Move.findById(pokemon.move4) : null,
        ]);

        const moveInfo = moves.map(move => {
            return move ? { name: move.name, type: move.type } : null;
        });

        console.log(moveInfo);
        res.json({ moves: moveInfo });
    } catch (error) {
        console.error('Error fetching moves:', error);
        res.status(500).json({ message: 'Error fetching moves' });
    }
});

// Create a move
router.post('/addMove', isAuthenticated, async (req, res) => {
    console.log("Got into the addmove route for a move");
    try {
        const { move, type, pokemonID } = req.body;

        const newMove = new Move({ name: move, type });

        console.log("Pokemon ID in the add move route: ", pokemonID);
        const pokemon = await Pokemon.findById(pokemonID);
        console.log("Pokemon to be saved to: ", pokemon);
        console.log("New move to be added: ", newMove);

        // Fetch the actual move objects based on move IDs
        const moves = await Promise.all([
            pokemon.move1 ? Move.findById(pokemon.move1) : null,
            pokemon.move2 ? Move.findById(pokemon.move2) : null,
            pokemon.move3 ? Move.findById(pokemon.move3) : null,
            pokemon.move4 ? Move.findById(pokemon.move4) : null,
        ]);

        const isUniqueMove = checkUniqueMove(moves, move, type);

        if (isUniqueMove) {
            const emptySlot = moves.findIndex(slot => slot === null);

            if (emptySlot !== -1) {
                console.log(`move ${emptySlot + 1}`);
                moves[emptySlot] = newMove;
                await newMove.save();

                // Update the corresponding move slot in the Pokemon model
                switch (emptySlot) {
                    case 0:
                        pokemon.move1 = newMove._id;
                        break;
                    case 1:
                        pokemon.move2 = newMove._id;
                        break;
                    case 2:
                        pokemon.move3 = newMove._id;
                        break;
                    case 3:
                        pokemon.move4 = newMove._id;
                        break;
                }

                await pokemon.save();

                res.status(200).json({ message: 'Move added successfully', moveID: newMove._id });            } else {
                console.log("Cannot add move, all slots are filled.");
                res.status(400).json({ message: 'Cannot add move, all slots are filled' });
            }
        } else {
            console.log("Duplicate move found.");
            res.status(400).json({ message: 'Duplicate move found' });
        }

    } catch (error) {
        console.error('Error adding move:', error);
        res.status(500).json({ message: 'Error adding move' });
    }
});


// Backend route to delete a move from a Pokémon by name
router.post('/deleteMove', async (req, res) => {
    try {
      const { pokemonID, moveName } = req.body;
  
      // Find the Pokémon by ID
      const pokemon = await Pokemon.findById(pokemonID);
  
      // Check if the Pokémon is found
      if (pokemon) {
        let deletedMove = null;
  
        // Check if the move exists in the move slots
        if (pokemon.move1 && pokemon.move1.name === moveName) {
          deletedMove = pokemon.move1;
          pokemon.move1 = null;
        } else if (pokemon.move2 && pokemon.move2.name === moveName) {
          deletedMove = pokemon.move2;
          pokemon.move2 = null;
        } else if (pokemon.move3 && pokemon.move3.name === moveName) {
          deletedMove = pokemon.move3;
          pokemon.move3 = null;
        } else if (pokemon.move4 && pokemon.move4.name === moveName) {
          deletedMove = pokemon.move4;
          pokemon.move4 = null;
        } else {
          return res.status(404).json({ message: 'Move not found on this Pokemon' });
        }
  
        await pokemon.save();
  
        // Delete the move from the Move collection
        if (deletedMove) {
          await Move.findByIdAndDelete(deletedMove._id);
          res.status(200).json({ message: 'Move deleted successfully' });
        } else {
          res.status(404).json({ message: 'Move not found' });
        }
      } else {
        res.status(404).json({ message: 'Pokemon not found' });
      }
    } catch (error) {
      console.error('Error deleting move:', error);
      res.status(500).json({ message: 'Error deleting move' });
    }
  });



module.exports = router;