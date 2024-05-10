const mongoose = require('mongoose');
const State = require('./models/State');
const statesData = require('./states.json');
require('dotenv').config();

async function insertStatesData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('MongoDB connected');

  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

insertStatesData();
