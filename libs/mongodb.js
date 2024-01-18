const mongoose = require('mongoose');
const config = require('../config/config');

const main = async () => {
  try {
    await mongoose.connect(config.DB_URI, {
      // keepAlive: true,
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
    });
    console.log('Conexión exitosa!!');
  } catch (e) {
    console.log('Error en la conexión :(' + e.message);
  }
};

module.exports = main;
