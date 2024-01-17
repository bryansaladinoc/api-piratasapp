const express = require('express');
const app = express();
const config = require('./config/config');
const routerApi = require('./routes');
const mongoose = require('mongoose');

// app.get('/', (req, res) => {
//   res.json('Hi Filibustero');
// });

routerApi(app);

mongoose
  .connect('mongodb://127.0.0.1:27017/piratasapp')
  .then(() => console.log('Connected!'));

app.listen(config.PORT, () => {
  console.log('Server PiratasApp Ready on port', config.PORT);
});
