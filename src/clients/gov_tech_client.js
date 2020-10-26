const axios = require('axios');
const config = require('config');

const endpointConfig = config.get('endpoints.gov_tech');

function getFacilityList () {
  return axios.post(endpointConfig.get('facility'), {});
}

function getCrowdLevels () {
  return axios.post(endpointConfig.get('crowdLevels'), {});
}

module.exports = {
  getCrowdLevels,
  getFacilityList,
}
