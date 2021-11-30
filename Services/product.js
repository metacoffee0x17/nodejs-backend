const { ProductModel } = require("../Models/product");
const mongoose = require("mongoose");

class ProductService {
  async getProductById(productId) {
    const product = await ProductModel.findById(productId);
    if (!product) return false;
    return product
  }
  async getProductByModel(model) {
    const product = await ProductModel.find({ "Product.Model": model });
    if (!product) return false;
    return product;
  }
  async checkProductByUrl(url) {
    const product = await ProductModel.findOne({ "Product.URL": url });
    if (!product) return false;
    return product;
  }
  async saveProduct(product, productId) {
    if (productId) {
      const productInfo = await ProductModel.findById(productId);
      if (productInfo) product = Object.assign(productInfo, product);
    }
    const productObj = new ProductModel(product);
    return await productObj.save();
  }
  async getProducts(brand,category,os,cpu,gpu,skip) {
    let condition = []
    if(brand && brand.length > 0) condition.push({'Product.Brand': {$in: brand}})
    if(category && category.length) condition.push({'Category': {$in: category}})
    if(os) condition.push({'Inside.Software.OS': os})
    if(cpu) condition.push({'Inside.Processor.CPU': cpu})
    if(gpu) condition.push({'Inside.Processor.GPU': gpu})
    if(condition.length > 0)
    return await ProductModel.find({
      $and: condition}).limit(20).skip(skip).select('Image Product Category');
   else
    return await ProductModel.find().limit(20).skip(skip).select('Image Product Category');
  }
  async deleteAllProducts() {
    return await ProductModel.deleteMany();
  }
  async deleteProduct(id) {
    return await ProductModel.findByIdAndDelete(id);
  }
  async trendingProducts() {
    return await ProductModel.find({ Trending: 1 })
  }
  async featuredProducts() {
    return await ProductModel.find({ Featured: 1 })
  }
  async getProductByBrand() {
    return await ProductModel.distinct('Product.Brand')
  }
  async getAllBatteryType() {
    return await ProductModel.distinct('Inside.Battery.Type')
  }
  async getAllGpu() {
    return await ProductModel.distinct('Inside.Processor.GPU')
  }
  async getAllCpu() {
    return await ProductModel.distinct('Inside.Processor.CPU')
  }
  async getAllOs() {
    return await ProductModel.distinct('Inside.Software.OS')
  }
  async getProductByCategory(category) {
    return await ProductModel.find({ Category: mongoose.Types.ObjectId(category) })
  }
}

module.exports = new ProductService();
