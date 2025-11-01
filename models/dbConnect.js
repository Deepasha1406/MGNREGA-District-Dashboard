const mongoose = require('mongoose');

const districtDataSchema = new mongoose.Schema({
  state: String,
  district: String,
  month: String,
  year: String,
  totalHouseholdsWorked: Number,
  totalPersondaysGenerated: Number,
  averageDaysOfEmploymentProvided: Number,
  dataFetchedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DistrictData', districtDataSchema);
