const { Schema, model } = require('mongoose');

const teamSchema = new Schema({

  name: {
    type: String,
    required: true
},
  pokemon1:
    {
      type: Schema.Types.ObjectId,
      ref: 'Pokemon'
    }
  ,
  pokemon2: 
    {
      type: Schema.Types.ObjectId,
      ref: 'Pokemon'
    }
  ,pokemon3:
    {
      type: Schema.Types.ObjectId,
      ref: 'Pokemon'
    }
,pokemon4: 
    {
      type: Schema.Types.ObjectId,
      ref: 'Pokemon'
    }
  ,pokemon5:
   {
      type: Schema.Types.ObjectId,
      ref: 'Pokemon'
    }
  ,pokemon6:
    {
      type: Schema.Types.ObjectId,
      ref: 'Pokemon'
    }
});

const Team = model('Team', teamSchema);

module.exports = Team;