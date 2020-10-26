const express = require('express');
const router = express.Router();

// services
const facilityService = require('../services/facility_service');

router.get('/facilities', async (req, res, next) => {
  try {
    const facilities = await facilityService.getAllFacilities(req.query.page, req.query.limit);
    res.status(200).json(facilities);
  } catch (error) {
    next(error);
  }
});

router.get('/crowdlevels', async (req, res, next) => {
  try {
    const opt = {};
    if (req.query.start_date && Date.parse(req.query.start_date)) {
      opt.startDate = new Date(req.query.start_date);
      opt.endDate = new Date(req.query.end_date) || new Date();
    }
    const facilities = await facilityService.getAllWithCrowdLevels(req.query.page || 1, req.query.limit || 10, opt);
    res.status(200).json(facilities);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
