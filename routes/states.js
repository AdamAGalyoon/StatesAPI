const express = require('express');
const router = express.Router();
const State = require('../models/State'); // Import your State model

// GET all states
router.get('/', async (req, res) => {
  try {
    const states = await State.find();
    res.json(states);
  } catch (err) {
    res.status(500).json({ message: err.message });
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

    // Select a random fun fact from the array of funfacts associated with the state
    const randomFact = state.funfacts[Math.floor(Math.random() * state.funfacts.length)];

    // Send the random fun fact as a JSON response
    res.json({ funfact: randomFact });
  } catch (err) {
    // Handle any errors that occur during  process
    console.error('Error fetching fun fact:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST to add fun facts to a state
router.post('/:state/funfact', async (req, res) => {
  const stateCode = req.params.state;
  const { funfacts } = req.body;

  try {
    const state = await State.findOne({ code: stateCode });
    if (!state) {
      return res.status(404).json({ error: 'State not found' });
    }

    // Add new fun facts to the existing array
    if (Array.isArray(funfacts)) {
      state.funfacts = state.funfacts.concat(funfacts);
    } else {
      state.funfacts.push(funfacts);
    }

    await state.save();
    res.json(state);
  } catch (err) {
    console.error('Error adding fun facts:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PATCH to update a fun fact of a state
router.patch('/:state/funfact', async (req, res) => {
  const stateCode = req.params.state;
  const { index, funfact } = req.body;

  try {
    const state = await State.findOne({ code: stateCode });
    if (!state) {
      return res.status(404).json({ error: 'State not found' });
    }

    if (index && Number.isInteger(index)) {
      const idx = index - 1; 
      if (idx >= 0 && idx < state.funfacts.length) {
        state.funfacts[idx] = funfact;
        await state.save();
        res.json(state);
      } else {
        res.status(400).json({ error: 'Invalid index' });
      }
    } else {
      res.status(400).json({ error: 'Index is required' });
    }
  } catch (err) {
    console.error('Error updating fun fact:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE to remove a fun fact from a state
router.delete('/:state/funfact', async (req, res) => {
  const stateCode = req.params.state;
  const { index } = req.body;

  try {
    const state = await State.findOne({ code: stateCode });
    if (!state) {
      return res.status(404).json({ error: 'State not found' });
    }

    
    if (index && Number.isInteger(index)) {
      const idx = index - 1; 
      if (idx >= 0 && idx < state.funfacts.length) {
        state.funfacts.splice(idx, 1);
        await state.save();
        res.json(state);
      } else {
        res.status(400).json({ error: 'Invalid index' });
      }
    } else {
      res.status(400).json({ error: 'Index is required' });
    }
  } catch (err) {
    console.error('Error removing fun fact:', err);
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
    res.json({ state: state.code, capital: state.capital }); 
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
    res.json({ state: state.code, nickname: state.nickname }); 
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
    res.json({ state: state.code, population: state.population }); 
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
    res.json({ state: state.code, admitted: state.admissionDate }); 
  } catch (err) {
    console.error('Error fetching state admission date:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
