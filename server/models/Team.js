const { Schema, model } = require('mongoose');

const teamSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  pokemon: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Pokemon' // Reference to the Pokémon model
    }
  ],
}, {
  toJSON: {
    virtuals: true,
    transform: function (_, team) {
      // Limit the number of Pokémon to a maximum of 6
      team.pokemon = team.pokemon.slice(0, 6);
    }
  }
});

teamSchema.virtual('pokemonCount').get(function () {
  return this.pokemon.length;
});

teamSchema.pre('save', function (next) {
  // Ensure that the array is limited to a maximum of 6 Pokémon
  this.pokemon = this.pokemon.slice(0, 6);
  next();
});

const Team = model('Team', teamSchema);

module.exports = Team;
