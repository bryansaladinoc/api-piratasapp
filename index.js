const express = require('express');
const app = express();
const config = require('./config/config');
const routerApi = require('./routes');
const main = require('./libs/mongodb');

// app.get('/', (req, res) => {
//   res.json('Hi Filibustero');
// });

routerApi(app);

const mongoDbInit = async () => {
  await main();
};

mongoDbInit();

app.listen(config.PORT, () => {
  console.log('Server PiratasApp Ready on port', config.PORT);
});
