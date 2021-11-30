const { User } = require("../Models/user");
const { BrandFollow } = require("../Models/brandFollow");
const Response = require("../Middlewares/response");
const UserService = require("../Services/user");
const EmailService = require("../Services/email");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { saveUser } = require("../Services/user");

class UserController {
  constructor() {}

  async createAccount(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        const response = new Response(
          0,
          "Error in creating user",
          101,
          "User already exists",
          {}
        );
        return res.status(200).send(response);
      }
      const hashedPassword = await User.hashPassword(password);
      req.body.password = hashedPassword;
      const userCreated = await UserService.saveUser(req.body);
      if (!userCreated) {
        const response = new Response(
          0,
          "Error in creating user",
          101,
          "Error creating user",
          {}
        );
        return res.status(200).send(response);
      }
      const payload = await User.createPayload(userCreated);
      let token = jwt.sign(payload, process.env.SECRET_KEY);
      const response = new Response(1, "User account created", "", "", {
        access_token: token,
      });
      return res.status(200).send(response);
    } catch (error) {
      const response = new Response(0, "Unexpected Error", 0, error, {});
      return res.status(400).send(response);
    }
  }

  async logIn(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        const response = new Response(
          0,
          "Error in user login",
          101,
          "User does not exist",
          {}
        );
        return res.status(200).send(response);
      }
      if (bcrypt.compareSync(password, user.password)) {
        const payload = await User.createPayload(user);
        let token = jwt.sign(payload, process.env.SECRET_KEY);
        const response = new Response(1, "User loggedIn successfully", "", "", {
          access_token: token,
        });
        return res.status(200).send(response);
      } else {
        const response = new Response(
          0,
          "Error in LogIn user",
          101,
          "Wrong Password. Try Again",
          {}
        );
        return res.status(200).send(response);
      }
    } catch (error) {
      const response = new Response(0, "Unexpected Error", 0, error, {});
      return res.status(400).send(response);
    }
  }

  async updateUser(req, res) {
    const userId = req.params.userId || req.userId;
    const { email } = req.body;
    try {
      const user = await UserService.getUserById(userId);
      if (!user) {
        const response = new Response(
          0,
          "Error in updating user",
          101,
          "User does not exist",
          {}
        );
        return res.status(200).send(response);
      }
      if (email) {
        const userExists = await UserService.findUserByEmail(email);
        if (userExists) {
          if (userExists._id !== user._id) {
            const response = new Response(
              0,
              "Error in updating user",
              101,
              "Email already registered",
              {}
            );
            return res.status(200).send(response);
          }
        }
      }
      const updated = await UserService.saveUser(req.body, userId);
      const payload = await User.createPayload(updated);
      let token = jwt.sign(payload, process.env.SECRET_KEY);
      if (updated) {
        const response = new Response(1, "User updated successfully", "", "", {
          user: updated,
          access_token: token,
        });
        return res.status(200).send(response);
      }
    } catch (error) {
      const response = new Response(0, "Unexpected Error", 0, error, {});
      return res.status(400).send(response);
    }
  }

  // async getUser(req, res) {
  //   const userId = req.params.userId || req.userId;
  //   try {
  //     const user = await UserService.getUserById(userId);
  //     if (!user) {
  //       const response = new Response(0, "Error in getting user", 101, "User does not exist", {});
  //       return res.status(200).send(response);
  //     }
  //     const response = new Response(1, "user data fetched successful", "", "", {
  //       user: user,
  //     });
  //     return res.status(200).send(response);
  //   } catch (error) {
  //     const response = new Response(0, "Unexpected Error", 0, error, {});
  //     return res.status(400).send(response);
  //   }
  // }

  async getUser(req, res) {
    const name = req.params.name || req.name;
    try {
      const user = await User.findOne({ name: name });
      if (!user) {
        const response = new Response(
          0,
          "Error in getting user",
          101,
          "User does not exist",
          {}
        );
        return res.status(200).send(response);
      }
      const response = new Response(1, "user data fetched successful", "", "", {
        user: user,
      });
      return res.status(200).send(response);
    } catch (error) {
      const response = new Response(0, "Unexpected Error", 0, error, {});
      return res.status(400).send(response);
    }
  }

  async getUserByName(req, res) {
    const name = req.params.name || req.name;
    try {
      const user = await User.findOne({ name: name }).select({
        name: 1,
        avatar: 1,
        products: 1,
        categories: 1,
        brands: 1,
        firstName: 1,
        lastName: 1,
        country: 1,
        contactEmail: 1,
        physicalAddress: 1,
        website: 1,
        phone: 1,
      });
      if (!user) {
        const response = new Response(
          0,
          "Error in getting user",
          101,
          "User does not exist",
          {}
        );
        return res.status(200).send(response);
      } else {
        const response = new Response(1, "user fetched successful", "", "", {
          user,
        });
        return res.status(200).send(response);
      }
    } catch (error) {
      const response = new Response(0, "Unexpected Error", 0, error, {});
      return res.status(400).send(response);
    }
  }

  async getUserNames(req, res) {
    const name = req.params.name || req.name;
    try {
      let names;
      if (name) {
        names = await User.find({ name: name }).select({ name: 1 });
      } else {
        names = await User.find({}).select({ name: 1 });
      }
      const response = new Response(1, "username fetched successful", "", "", {
        names: names,
      });
      return res.status(200).send(response);
    } catch (error) {
      const response = new Response(0, "Unexpected Error", 0, error, {});
      return res.status(400).send(response);
    }
  }

  async deleteUser(req, res) {
    const userId = req.params.userId || req.userId;
    try {
      const user = await UserService.deleteUser(userId);
      if (!user) {
        const response = new Response(
          0,
          "Error in deleting user",
          101,
          "User does not exist",
          {}
        );
        return res.status(200).send(response);
      }
      const response = new Response(1, "user deleted successfuly", "", "", {
        user: user,
      });
      return res.status(200).send(response);
    } catch (error) {
      const response = new Response(0, "Unexpected Error", 0, error, {});
      return res.status(400).send(response);
    }
  }

  async contactUs(req, res) {
    const { email } = req.body;
    try {
      if (email) {
        await EmailService.ContactUsMail(req.body);
        const response = new Response(
          1,
          "sending contact us email",
          "",
          "",
          {}
        );
        return res.status(200).send(response);
      }
      const response = new Response(
        0,
        "Error in contact us emai",
        101,
        "No email provided",
        {}
      );
      return res.status(200).send(response);
    } catch (error) {
      const response = new Response(0, "Unexpected Error", 0, error, {});
      return res.status(400).send(response);
    }
  }

  async getUserInfo(req, res) {
    const email = req.params.email || req.body.email;
    try {
      let user = await UserService.getUserByEmail(email);
      if (!user) {
        user = await saveUser({ email: email });
      }
      const response = new Response(1, "user data fetched successful", "", "", {
        user: user,
      });
      return res.status(200).send(response);
    } catch (error) {
      const response = new Response(0, "Unexpected Error", 0, error, {});
      return res.status(400).send(response);
    }
  }

  async updateUserInfo(req, res) {
    const { email } = req.body;
    try {
      const user = await UserService.getUserByEmail(email);
      if (!user) {
        const response = new Response(
          0,
          "Error in updating user",
          101,
          "User does not exist",
          {}
        );
        return res.status(200).send(response);
      }
      // if (email) {
      const userExists = await UserService.findUserByEmail(email);
      // if (userExists) {
      //   if (userExists.id !== user.id) {
      //     const response = new Response(0, "Error in updating user", 101, "Email already registered", {});
      //     return res.status(200).send(response);
      //   }
      // }
      // }
      const updated = await UserService.saveUser(req.body, userExists.id);
      const payload = await User.createPayload(updated);
      // let token = jwt.sign(payload, process.env.SECRET_KEY);
      if (updated) {
        const response = new Response(1, "User updated successfully", "", "", {
          user: updated,
        });
        return res.status(200).send(response);
      }
    } catch (error) {
      const response = new Response(0, "Unexpected Error", 0, error, {});
      return res.status(400).send(response);
    }
  }

  async follow(req, res) {
    const { name, follower } = req.body;
    try {
      const brandFollow = await BrandFollow.findOne({ name: name, follower: follower });
      if (!brandFollow) {
        const brandFollowObj = new BrandFollow({
          name: name,
          follower: follower,
        });
        const followedBrand = await brandFollowObj.save();
        const followOfBrand = await BrandFollow.find({ name: name});
        const response = new Response(
          1,
          "Brand was followed successfully",
          "",
          "",
          {
            follow: true,
            followLength: followOfBrand.length
          }
        );
        return res.status(200).send(response);
      } else {
        const unfollowed = await BrandFollow.findByIdAndDelete(brandFollow.id);
        const followOfBrand = await BrandFollow.find({ name: name});
        const response = new Response(
          1,
          "Brand was unfollowed successfully",
          "",
          "",
          {
            follow: false,
            followLength: followOfBrand.length
          }
        );
        return res.status(200).send(response);
      }
    } catch (error) {
      const response = new Response(0, "Unexpected Error", 0, error, {});
      return res.status(400).send(response);
    }
  }

  async followLength(req, res) {
    const { name } = req.params || req.body;
    try {
        const followOfBrand = await BrandFollow.find({ name: name});
        const response = new Response(
          1,
          "Get follwed status of brand",
          "",
          "",
          {
            followLength: followOfBrand.length
          }
        );
        return res.status(200).send(response);
    } catch (error) {
      const response = new Response(0, "Unexpected Error", 0, error, {});
      return res.status(400).send(response);
    }
  }

  async getFollow(req, res) {
    const { name, follower } = req.query || req.body;
    try {
      const follow = await BrandFollow.find({ name: name, follower: follower });
      const followOfBrand = await BrandFollow.find({ name: name});
      const response = new Response(
        1,
        "Follow Status",
        "",
        "",
        {
          follow: follow.length > 0,
          followLength: followOfBrand.length
        }
      );
      return res.status(200).send(response);
    } catch (error) {
      const response = new Response(0, "Unexpected Error", 0, error, {});
      return res.status(400).send(response);
    }
  }
}

module.exports = new UserController();
