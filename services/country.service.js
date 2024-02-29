const Country = require('../schemas/country.schema');

class CountryService {
  async find() {
    return await Country.find().sort({ nombre: 1 }).exec();
  }
}

module.exports = CountryService;
