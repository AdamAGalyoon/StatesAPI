const State = require('../models/State');

async function getAllStates(req, res) {
  try {
    const states = await State.find();
    res.json(states);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getStatesByContig(req, res) {
  const contig = req.query.contig;

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
}

async function getStateByCode(req, res) {
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
}

async function getRandomFunFact(req, res) {
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
}

async function addFunFacts(req, res) {
  const stateCode = req.params.state;
  const { funfacts } = req.body;

  try {
    const state = await State.findOne({ code: stateCode });
    if (!state) {
      return res.status(404).json({ error: 'State not found' });
    }

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
}

async function updateFunFact(req, res) {
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
}

async function removeFunFact(req, res) {
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
}

async function getStateCapital(req, res) {
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
}

async function getStateNickname(req, res) {
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
}

async function getStatePopulation(req, res) {
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
}

async function getStateAdmissionDate(req, res) {
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
}

module.exports = {
  getAllStates,
  getStatesByContig,
  getStateByCode,
  getRandomFunFact,
  addFunFacts,
  updateFunFact,
  removeFunFact,
  getStateCapital,
  getStateNickname,
  getStatePopulation,
  getStateAdmissionDate
};
