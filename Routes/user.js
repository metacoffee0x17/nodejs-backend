const express = require("express");
const router = express.Router();

const userController = require("../Controllers/UserController");
const requireAuth = require("../Middlewares/requireAuth");
// router.use(requireAuth);

router.post("/getUserInfo", userController.getUserInfo.bind(userController));
router.post("/updateUserInfo", userController.updateUserInfo.bind(userController));
router.post("/update", userController.updateUser.bind(userController));
router.post("/follow", userController.follow.bind(userController));
router.get("/follow", userController.getFollow.bind(userController));
router.get("/followLength/:name", userController.followLength.bind(userController));
// router.get("/:userId?", userController.getUser.bind(userController));
router.get("/getusernames/:name?", userController.getUserNames.bind(userController));
router.get("/:name?", userController.getUserByName.bind(userController));
module.exports = router;
