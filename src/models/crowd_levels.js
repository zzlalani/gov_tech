const mongoose = require('mongoose');

const CrowdLevelSchema = new mongoose.Schema({
  id: String,
  band: Number,
  createdAt: Date,
  trend: Boolean,
});

module.exports = mongoose.model('CrowdLevel', CrowdLevelSchema);
