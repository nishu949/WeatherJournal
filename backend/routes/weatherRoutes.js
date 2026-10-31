const express = require('express');
const router = express.Router();
const Weather = require('../models/Weather');


// POST /api/weather
router.post('/', async (req, res, next) => {
  try {
    const { recordDate, temperature, conditions, location, notes } = req.body;

    const record = await Weather.create({
      recordDate,
      temperature,
      conditions,
      location,
      notes,
    });

    res.status(201).json({
      success: true,
      message: 'Weather record created successfully',
      data: record,
    });
  } catch (err) {
    next(err);
  }
});


// GET /api/weather
router.get('/', async (req, res, next) => {
  try {
    const { location, conditions } = req.query;
    const filter = {};
    if (location) filter.location = new RegExp(location, 'i');
    if (conditions) filter.conditions = conditions;

    const records = await Weather.find(filter).sort({ recordDate: -1 });
    res.status(200).json({ success: true, count: records.length, data: records });
  } catch (err) {
    next(err);
  }
});


// GET /api/weather/:id
router.get('/:id', async (req, res, next) => {
  try {
    const record = await Weather.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }
    res.status(200).json({ success: true, data: record });
  } catch (err) {
    next(err);
  }
});


// PUT /api/weather/:id
router.put('/:id', async (req, res, next) => {
  try {
    const record = await Weather.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!record) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Weather record updated successfully',
      data: record,
    });
  } catch (err) {
    next(err);
  }
});


// DELETE /api/weather/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const record = await Weather.findByIdAndDelete(req.params.id);
    if (!record) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }
    res.status(200).json({ success: true, message: 'Weather record deleted', data: record });
  } catch (err) {
    next(err);
  }
});


// GET /api/weather/summary/stats
router.get('/summary/stats', async (req, res, next) => {
  try {
    const total = await Weather.countDocuments();
    const avg = await Weather.aggregate([
      { $group: { _id: null, avgTemp: { $avg: '$temperature' } } },
    ]);
    const byCondition = await Weather.aggregate([
      { $group: { _id: '$conditions', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    const byLocation = await Weather.aggregate([
      { $group: { _id: '$location', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalRecords: total,
        averageTemperature: avg.length ? Number(avg[0].avgTemp.toFixed(2)) : 0,
        byCondition,
        byLocation,
      },
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;