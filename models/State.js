const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stateSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  funfacts: [{
    type: String
  }]
});

const State = mongoose.model('State', stateSchema);
module.exports = State;
