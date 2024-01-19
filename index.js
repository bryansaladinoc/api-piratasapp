const express = require('express');
const app = express();
const config = require('./config/config');
const routerApi = require('./routes');
const {
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');
const main = require('./libs/mongodb');
require('./utils/auth');

app.use(express.json({ limit: '1000mb' }));

app.get('/', (req, res) => {
  res.json('Hi Filibustero');
});

routerApi(app);

const mongoDbInit = async () => {
  await main();
};

app.use(boomErrorHandler);
app.use(errorHandler);

mongoDbInit();

app.listen(config.PORT, () => {
  console.log('Server PiratasApp Ready on port', config.PORT);
});
