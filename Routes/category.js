const express = require("express");
const router = express.Router();
const CategoryController = require("../Controllers/CategoryController");


router.post("/add", CategoryController.saveCategory);
router.get("/getAll", CategoryController.getCategory);
//router.get("/get/:categoryId", CategoryController.getCategoryById);
module.exports = router;
