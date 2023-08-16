const { Schema, model } = require('mongoose');

const teamSchema = new Schema({

  name: {
    type: String,
    required: true
},
  pokemon1:
    {
      type: Schema.Types.ObjectId,
      ref: 'Pokemon',
      default: null
    }
  ,
  pokemon2: 
    {
      type: Schema.Types.ObjectId,
      ref: 'Pokemon',
      default: null
    }
  ,pokemon3:
    {
      type: Schema.Types.ObjectId,
      ref: 'Pokemon',
      default: null
    }
,pokemon4: 
    {
      type: Schema.Types.ObjectId,
      ref: 'Pokemon',
      default: null
    }
  ,pokemon5:
   {
      type: Schema.Types.ObjectId,
      ref: 'Pokemon',
      default: null
    }
  ,pokemon6:
    {
      type: Schema.Types.ObjectId,
      ref: 'Pokemon',
      default: null
    }
});

teamSchema.pre('remove', async function (next) {
  const pokemonIds = [
    this.pokemon1,
    this.pokemon2,
    this.pokemon3,
    this.pokemon4,
    this.pokemon5,
    this.pokemon6
  ];

  try {
    // Delete associated Pokémon (triggers Pokémon schema's pre-remove middleware)
    await Pokemon.deleteMany({ _id: { $in: pokemonIds } });
    next();
  } catch (error) {
    next(error);
  }
});


const Team = model('Team', teamSchema);

module.exports = Team;