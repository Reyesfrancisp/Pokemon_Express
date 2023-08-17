const { Schema, model } = require('mongoose');

const pokemonSchema = new Schema({

  name: {
    type: String,
    required: false
  },
  move1: {
    type: Schema.Types.ObjectId,
    ref: 'Move',
    default: null
  },
  move2: {
    type: Schema.Types.ObjectId,
    ref: 'Move',
    default: null
  },
  move3: {
    type: Schema.Types.ObjectId,
    ref: 'Move',
    default: null
  },
  move4: {
    type: Schema.Types.ObjectId,
    ref: 'Move',
    default: null

  }
});

pokemonSchema.path('move1').validate(function (value) {
  return checkUniqueMove(this, value, 'move1');
}, 'Duplicate move found in the same Pokémon');

pokemonSchema.path('move2').validate(function (value) {
  return checkUniqueMove(this, value, 'move2');
}, 'Duplicate move found in the same Pokémon');

pokemonSchema.path('move3').validate(function (value) {
  return checkUniqueMove(this, value, 'move3');
}, 'Duplicate move found in the same Pokémon');

pokemonSchema.path('move4').validate(function (value) {
  return checkUniqueMove(this, value, 'move4');
}, 'Duplicate move found in the same Pokémon');

function checkUniqueMove(pokemon, moveId, currentMoveField) {
  const moves = [pokemon.move1, pokemon.move2, pokemon.move3, pokemon.move4];

  if (moveId === null) {
    return true; // Allow null move
  }

  const duplicateMoves = moves.filter(move => move !== undefined && move !== null && move.toString() === moveId.toString());

  return duplicateMoves.length <= 1;
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
