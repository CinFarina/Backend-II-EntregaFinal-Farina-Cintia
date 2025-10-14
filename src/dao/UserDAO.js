const UserModel = require('./models/user.model');

class UserDAO {
  getByEmail(email) {
  return UserModel.findOne({ email });
  }
  async create(userData) {
    return await UserModel.create(userData);
  }
}

module.exports = UserDAO;
