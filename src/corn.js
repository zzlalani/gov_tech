const config = require('config');
const cron = require('node-cron');

// corn runners
const { runner: facilityRunner } = require('./corn/facility_corn');
const { runner: crowdLevelRunner } = require('./corn/crowd_level_corn');

// config
const cornConfig = config.get('corn');

const runner = async () => {
  await facilityRunner();
  await crowdLevelRunner();
}

module.exports = {
  init: async () => {
    console.log(`Corn INIT with schedule ${cornConfig.get('schedule')}`);
    // run for the first time
    await runner();
    cron.schedule(cornConfig.get('schedule'), async () => {
      // run every interval
      await runner();
    }, {});
  }
}
