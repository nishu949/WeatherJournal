require('dotenv').config();
const mongoose = require('mongoose');
const Weather = require('./models/Weather');

const samples = [
  { recordDate: '2024-06-01', temperature: 32, conditions: 'Sunny', location: 'Chennai', notes: 'Very hot afternoon' },
  { recordDate: '2024-06-02', temperature: 28, conditions: 'Cloudy', location: 'Bengaluru', notes: 'Pleasant day' },
  { recordDate: '2024-06-03', temperature: 22, conditions: 'Rainy', location: 'Mumbai', notes: 'Heavy rain at night' },
  { recordDate: '2024-06-04', temperature: 15, conditions: 'Foggy', location: 'Shimla', notes: 'Low visibility in morning' },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    await Weather.deleteMany({});
    await Weather.insertMany(samples);
    console.log('Sample records inserted');
    mongoose.connection.close();
  })
  .catch((err) => console.error(err));