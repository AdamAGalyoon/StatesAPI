const express = require('express');
const router = express.Router();
const State = require('../models/State'); // Import your State model

// GET all states
router.get('/', async (req, res) => {
  try {
    const states = await State.find();
    res.json(states);
  } catch (err) {
    console.error('Error fetching states:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET states based on contig parameter
router.get('/', async (req, res) => {
  const contig = req.query.contig; // Get the contig query parameter

  try {
    let states;
    if (contig === 'true') {
      states = await State.find({ code: { $nin: ['AK', 'HI'] } });
    } else if (contig === 'false') {
      states = await State.find({ code: { $in: ['AK', 'HI'] } });
    } else {
      return res.status(400).json({ error: 'Invalid query parameter. Use contig=true or contig=false' });
    }
    res.json(states);
  } catch (err) {
    console.error('Error fetching states by contiguity:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET state by code
router.get('/:state', async (req, res) => {
  const code = req.params.state;

  try {
    const state = await State.findOne({ code });
    if (!state) {
      return res.status(404).json({ error: 'State not found' });
    }
    res.json(state);
  } catch (err) {
    console.error('Error fetching state by code:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET a random fun fact for the state
router.get('/:state/funfact', async (req, res) => {
  const code = req.params.state;

  try {
    const state = await State.findOne({ code });
    if (!state || !state.funfacts || state.funfacts.length === 0) {
      return res.status(404).json({ error: 'No fun facts found for the state' });
    }
    const randomFact = state.funfacts[Math.floor(Math.random() * state.funfacts.length)];
    res.json({ funfact: randomFact });
  } catch (err) {
    console.error('Error fetching fun fact:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET state capital
router.get('/:state/capital', async (req, res) => {
  const code = req.params.state;

  try {
    const state = await State.findOne({ code });
    if (!state) {
      return res.status(404).json({ error: 'State not found' });
    }
    res.json({ state: state.code, capital: state.capital }); // Assuming 'capital' is a field in your State model
  } catch (err) {
    console.error('Error fetching state capital:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET state nickname
router.get('/:state/nickname', async (req, res) => {
  const code = req.params.state;

  try {
    const state = await State.findOne({ code });
    if (!state) {
      return res.status(404).json({ error: 'State not found' });
    }
    res.json({ state: state.code, nickname: state.nickname }); // Assuming 'nickname' is a field in your State model
  } catch (err) {
    console.error('Error fetching state nickname:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET state population
router.get('/:state/population', async (req, res) => {
  const code = req.params.state;

  try {
    const state = await State.findOne({ code });
    if (!state) {
      return res.status(404).json({ error: 'State not found' });
    }
    res.json({ state: state.code, population: state.population }); // Assuming 'population' is a field in your State model
  } catch (err) {
    console.error('Error fetching state population:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET state admission date
router.get('/:state/admission', async (req, res) => {
  const code = req.params.state;

  try {
    const state = await State.findOne({ code });
    if (!state) {
      return res.status(404).json({ error: 'State not found' });
    }
    res.json({ state: state.code, admitted: state.admissionDate }); // Assuming 'admissionDate' is a field in your State model
  } catch (err) {
    console.error('Error fetching state admission date:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
