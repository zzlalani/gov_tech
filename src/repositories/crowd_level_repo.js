const CrowdLevel = require('../models/crowd_levels');

function insertMany(list = []) {
  if (list.length === 0) {
    throw new Error('Empty list');
  }
  return CrowdLevel.insertMany(list);
}

function clear() {
  return CrowdLevel.deleteMany({});
}

module.exports = {
  clear,
  insertMany,
};
