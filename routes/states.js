const express = require('express');
const router = express.Router();
const State = require('../models/State'); // Import your State model

// Routes using controller functions
router.get('/', statesController.getAllStates);
router.get('/', statesController.getStatesByContig);
router.get('/:state', statesController.getStateByCode);
router.get('/:state/funfact', statesController.getRandomFunFact);
router.post('/:state/funfact', statesController.addFunFacts);
router.patch('/:state/funfact', statesController.updateFunFact);
router.delete('/:state/funfact', statesController.removeFunFact);
router.get('/:state/capital', statesController.getStateCapital);
router.get('/:state/nickname', statesController.getStateNickname);
router.get('/:state/population', statesController.getStatePopulation);
router.get('/:state/admission', statesController.getStateAdmissionDate);

module.exports = router;
