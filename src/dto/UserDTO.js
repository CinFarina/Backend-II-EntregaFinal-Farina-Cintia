class UserDTO {
  constructor(user) {
    this.id = user._id || user.id;
    this.email = user.email;
    this.firstName = user.firstName || '';
    this.lastName = user.lastName || '';
    this.role = user.role;
    this.fullName = `${this.firstName} ${this.lastName}`.trim();
  }
}

module.exports = UserDTO;
