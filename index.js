const express = require('express');
const app = express();
const cors = require('cors');

const config = require('./config/config');
const routerApi = require('./routes');
const {
  errorHandler,
  mongoErrorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');
const main = require('./libs/mongodb');
require('./utils/auth');

app.use(cors());
app.use(express.json({ limit: '1000mb' }));
// app.use(express.urlencoded({ extended: true, limit: '1000mb' }));

app.get('/', (req, res) => {
  res.json('Hi Filibustero');
});

routerApi(app);

const mongoDbInit = async () => {
  await main();
};

app.use(boomErrorHandler);
app.use(mongoErrorHandler);
app.use(errorHandler);

mongoDbInit();

app.listen(config.PORT, () => {
  console.log('Server PiratasApp Ready on port', config.PORT);
});
