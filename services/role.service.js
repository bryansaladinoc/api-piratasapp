const Role = require('../schemas/role.schema');
const modelUser = require('../schemas/user.schema');

class RoleService {
  async find() {
    return await Role.find().populate('permissions').exec();
  }

  async create(data) {
    const role = new Role(data);
    await role.save();

    return role;
  }

  async upRoleUser (idUser, idRole) {
    const result = await modelUser.findByIdAndUpdate(
      idUser,
      { roles: idRole }
    )

    return result;
  }

}

module.exports = RoleService;
