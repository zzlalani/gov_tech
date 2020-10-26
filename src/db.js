const config = require('config');
const mongoose = require("mongoose");

const dbConfig = config.get('db');

module.exports = {
  init: async () => {
    await mongoose
      .connect(
        dbConfig.get('connection'),
        {
          dbName: dbConfig.get('database'),
          useUnifiedTopology: true,
          useNewUrlParser: true,
        },
      );
  }
}
