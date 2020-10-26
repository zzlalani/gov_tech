const config = require('config');

// clients
const govTechClient = require('../clients/gov_tech_client');

// repositories
const propertyRepo = require('../repositories/property_repo');

// utilities
const decrypt = require('../utilities/decrypt');

// config
const decryptConfig = config.get('decrypt');

const RUNNER = 'Facility Runner';

async function runner() {
  console.log(`${RUNNER} started at ${new Date()}`);
  try {
    const response = await govTechClient.getFacilityList();
    if (response && response.data && response.data.data && response.data.data.geojsonPoint) {
      const stringData = decrypt(
        response.data.data.geojsonPoint,
        'hex',
        decryptConfig.get('algorithm'),
        decryptConfig.get('key'),
      );
      const facilityData = JSON.parse(stringData);
      if (facilityData && facilityData.jsonstring && facilityData.jsonstring.features) {
        const dataSet = [];
        facilityData.jsonstring.features.forEach(data => {
          dataSet.push({
            ...data.properties,
            GEOMETRY: {
              ...data.geometry,
            },
          });
        });
        /**
         * assumption to remove previous pulled data
         */
        await propertyRepo.clear();
        await propertyRepo.insertMany(dataSet);
      }
    }
  } catch (error) {
    console.error(`Runner Failed`);
    console.error(error);
  }
  console.log(`${RUNNER} Ended at ${new Date()}`);
}

module.exports = {
  runner,
};
