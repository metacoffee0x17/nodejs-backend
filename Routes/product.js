const express = require("express");
const router = express.Router();

const ProductController = require("../Controllers/ProductController");
// const requireAuth = require("../Middlewares/requireAuth");
//router.use(requireAuth);

router.post("/add/:productId?", ProductController.saveProduct.bind(ProductController));
router.post("/search", ProductController.searchProduct);
router.post("/getAll", ProductController.getProducts);
router.get("/get/:productId?", ProductController.getProduct);
router.get("/trending", ProductController.getTrendingProducts);
router.get("/featured", ProductController.getFeaturedProducts);
router.get("/brands", ProductController.getProductBrands);
router.get("/os", ProductController.getAllOS);
router.get("/cpu", ProductController.getAllCPU);
router.get("/gpu", ProductController.getAllGPU);
router.get("/battery", ProductController.getAllBattery);
router.delete("/delete/:productId", ProductController.DeleteProduct.bind(ProductController));
//router.delete("/clear", ProductController.deleteAllProducts);

module.exports = router;
