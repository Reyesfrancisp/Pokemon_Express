const { Schema, model } = require('mongoose');

const pokemonSchema = new Schema({

    name: {
        type: String,
        required: false
    },
    move1: {
        type: Schema.Types.ObjectId,
        ref: 'Move'
    },
    move2: {
        type: Schema.Types.ObjectId,
        ref: 'Move' 
    },
    move3: {
        type: Schema.Types.ObjectId,
        ref: 'Move'
    },
    move4: {
        type: Schema.Types.ObjectId,
        ref: 'Move'
    }
});

pokemonSchema.path('move1').validate(function(value) {
  return checkUniqueMove(this, value);
}, 'Duplicate move found in the same Pokémon');

pokemonSchema.path('move2').validate(function(value) {
  return checkUniqueMove(this, value);
}, 'Duplicate move found in the same Pokémon');

pokemonSchema.path('move3').validate(function(value) {
  return checkUniqueMove(this, value);
}, 'Duplicate move found in the same Pokémon');

pokemonSchema.path('move4').validate(function(value) {
  return checkUniqueMove(this, value);
}, 'Duplicate move found in the same Pokémon');

function checkUniqueMove(pokemon, moveId) {
  const moves = [pokemon.move1, pokemon.move2, pokemon.move3, pokemon.move4];
  const uniqueMoves = new Set(moves.filter(move => move !== undefined));

  return uniqueMoves.size === moves.length;
}

pokemonSchema.pre('remove', async function (next) {
  const moveIds = this.moves;
  try {
    // Delete associated moves
    await Move.deleteMany({ _id: { $in: moveIds } });
    next();
  } catch (error) {
    next(error);
  }
});

const Pokemon = model('Pokemon', pokemonSchema);

module.exports = Pokemon;
