const { User } = require("../Models/user");

class UserService {
  async getUserById(userId) {
    const user = await User.findById(userId);
    if (!user) return false;
    return user;
  }

  async saveUser(user, userId) {
    if (userId) {
      const userInfo = await User.findById(userId);
      if (userInfo) user = Object.assign(userInfo, user);
    }
    const UserObj = new User(user);
    return await UserObj.save();
  }

  async deleteUser(id) {
    return await User.findByIdAndDelete(id);
  }

  async findUserByEmail(email) {
    return await User.findOne({ email: email });
  }

  
  async getUserByEmail(email) {
    const user = await User.findOne({email: email});
    if (!user) return false;
    return user;
  }

}

module.exports = new UserService();
