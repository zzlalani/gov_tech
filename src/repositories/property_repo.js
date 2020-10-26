const Property = require('../models/properties');
const CrowdLevel = require('../models/crowd_levels');

function insertMany(list = []) {
  if (list.length === 0) {
    throw new Error('Empty list');
  }
  return Property.insertMany(list);
}

function clear() {
  return Property.deleteMany({});
}

function getAll(page, limit) {
  return Property.paginate(
    {},
    {
      page,
      limit,
    },
  );
}

async function getAllWithCrowdLevels(page, limit, opt) {
  const facilities = await Property.paginate(
    {},
    {
      page,
      limit,
    },
  );
  for (let i = 0; i < facilities.docs.length; i++) {
    const facility = facilities.docs[i];
    if (opt && opt.startDate) {
      const crowdLevels = await CrowdLevel.find({
        id: facility.ID,
        createdAt: { $gte: opt.startDate , $lte: opt.endDate },
      }).sort({
        createdAt: -1,
      }).select({
        band: 1,
      });
      let total = 0;
      for (let j = 0; j < crowdLevels.length; j++) {
        total += crowdLevels[j].band;
      }
      facility._doc.band = total / crowdLevels.length;
    } else {
      const crowdLevel = await CrowdLevel.findOne({
        id: facility.ID,
      }).sort({
        createdAt: -1,
      }).select({
        band: 1,
      });
      facility._doc.band = crowdLevel.band;
    }
  }
  return facilities;
}

module.exports = {
  clear,
  getAll,
  getAllWithCrowdLevels,
  insertMany,
};
