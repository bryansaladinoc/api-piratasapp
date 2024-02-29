const Role = require('../schemas/role.schema');

class RoleService {
  async find() {
    return await Role.find().populate('permissions').exec();
  }

  async create(data) {
    const role = new Role(data);
    await role.save();

    return role;
  }
}

module.exports = RoleService;
