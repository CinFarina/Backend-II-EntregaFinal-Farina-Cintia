const UserDAO = require('../dao/UserDAO');
const { hashPassword } = require('../utils/hash');

class UserRepository {
  constructor() {
    this.dao = new UserDAO();
  }
  async register(userData) {
    userData.password = hashPassword(userData.password);
    return await this.dao.create(userData);
  }
  async getByEmail(email) {
    return await this.dao.getByEmail(email);
  }
}

module.exports = UserRepository;
