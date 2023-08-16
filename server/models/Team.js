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

const Team = model('Team', teamSchema);

module.exports = Team;