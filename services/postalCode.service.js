const PostalCodeSchema = require('../schemas/postalCode.schema');

class PostalCodeService {
  async find(state, city, cp) {
    console.log(state);
    const cps = await PostalCodeSchema.find({
      estado: {
        $regex: new RegExp(state, 'i'),
      },
      // city: {
      //   $regex: new RegExp(city),
      // },
      // codigo_postal: {
      //   $regex: new RegExp(cp),
      // },
    }).exec();

    return cps;
  }
}

module.exports = PostalCodeService;
