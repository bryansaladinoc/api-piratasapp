const Permission = require('../schemas/permission.schema');

class PermissionService {
  async find() {
    return await Permission.find();
  }

  async findOne(id) {
    return await Permission.findOne({ _id: id }).exec();
  }

  async create(data) {
    const permission = new Permission(data);
    await permission.save();
    return permission;
  }
}

module.exports = PermissionService;
