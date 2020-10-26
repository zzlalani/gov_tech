const propertyRepo = require('../repositories/property_repo');

async function getAllFacilities(page = null, limit = null) {
  return propertyRepo.getAll(page, limit);
}

async function getAllWithCrowdLevels(page = null, limit = null, opt) {
  return propertyRepo.getAllWithCrowdLevels(page, limit, opt);
}

module.exports = {
  getAllFacilities,
  getAllWithCrowdLevels,
}
