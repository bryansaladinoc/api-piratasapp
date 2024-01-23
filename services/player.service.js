const boom = require('@hapi/boom');
const Player = require('../schemas/player.schema');

class PlayerService {
  async find(type = '') {
    const player = Player.find({
      type: { $regex: new RegExp(type, 'i') },
    }).exec();

    return player;
  }

  async findOne(id) {
    const player = await Player.findOne({ _id: id }).exec();

    if (!player) {
      throw boom.notFound();
    }

    return player;
  }

  async create(data) {
    const player = await Player.create({ ...data });

    return player;
  }

  async update(id, data) {
    const result = await Player.updateOne({ _id: id }, { ...data }).exec();

    return result;
  }

  async delete(id) {
    const player = await Player.findOneAndDelete({ _id: id }).exec();

    return player;
  }
}

module.exports = PlayerService;
