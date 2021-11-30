const express = require("express");
const router = express.Router();

const userController = require("../Controllers/UserController");

router.post("/createAccount", userController.createAccount);
router.post("/login", userController.logIn);
router.post("/contactUs", userController.contactUs);


module.exports = router;
