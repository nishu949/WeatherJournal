const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema(
  {
    recordDate: {
      type: Date,
      required: [true, 'Record date is required'],
    },
    temperature: {
      type: Number,
      required: [true, 'Temperature is required'],
      min: [-100, 'Temperature must be ≥ -100°C'],
      max: [60, 'Temperature must be ≤ 60°C'],
    },
    conditions: {
      type: String,
      required: [true, 'Weather condition is required'],
      enum: {
        values: ['Sunny', 'Cloudy', 'Rainy', 'Snowy', 'Windy', 'Stormy', 'Foggy'],
        message: '{VALUE} is not a valid weather condition',
      },
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
      minlength: [2, 'Location must be at least 2 characters'],
      maxlength: [100, 'Location cannot exceed 100 characters'],
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [250, 'Notes cannot exceed 250 characters'],
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Weather', weatherSchema);