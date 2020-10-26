const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const PropertiesSchema = new mongoose.Schema({
  ID: String,
  SAT: String,
  SUN: String,
  NAME: String,
  TYPE: String,
  EXTRA: String,
  ADDRESS: String,
  WEEKDAY: String,
  CBCLOSED: String,
  GGW_FLAG: String,
  BLK_HOUSE: String,
  ROAD_NAME: String,
  OTHER_NAME: String,
  POSTALCODE: String,
  OPR_HRS_FRIDAY: String,
  OPR_HRS_MONDAY: String,
  OPR_HRS_TUESDAY: String,
  OPR_HRS_SATURDAY: String,
  OPR_HRS_THURSDAY: String,
  OPR_HRS_SUNDAY_PH: String,
  OPR_HRS_WEDNESDAY: String,
  GEOMETRY: {
    type: {type: String},
    coordinates: Array,
  },
});

PropertiesSchema.set('timestamps', true);
PropertiesSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Property', PropertiesSchema);
