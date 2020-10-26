// clients
const govTechClient = require('../clients/gov_tech_client');

// repositories
const crowdLevelRepo = require('../repositories/crowd_level_repo');

const RUNNER = 'Crowd Level Runner';

async function runner() {
  console.log(`${RUNNER} started at ${new Date()}`);
  try {
    const response = await govTechClient.getCrowdLevels();
    if (response && response.data && response.data.data && response.data.data.facilities) {
      const facilities = response.data.data.facilities;
      const dataSet = [];
      facilities.forEach(data => {
        dataSet.push({
          ...data,
        });
      });
      /**
       * assumption to keep previous pulled data
       */
      // await crowdLevelRepo.clear();
      await crowdLevelRepo.insertMany(dataSet);
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
