const Response = require("../Middlewares/response");
const ProductService = require("../Services/product");
const elasticService = require("../Services/elasticAppSearch");
const { ProductModel, ProductSampleData } = require("../Models/product");
const { Elastic } = require("../Models/elasticSearch");
const util = require('util')

class ProductController {
  constructor() { }
  async saveProduct(req, res) {
    let { _id, Product } = req.body;
    if (_id) delete req.body._id;
    let elasticResult;
    try {
      if (Product && Product.Category) {
        req.body.Category = Product.Category
        delete Product.Category
      }
      if (Product && Product.URL) {
        const exists = await ProductService.checkProductByUrl(Product.URL);
        _id = exists._id
      }
      const result = await ProductService.saveProduct(req.body, _id);
      if (result) {
        if (_id) {
          console.log('Here.... UPDATE')
          const savedProduct = await ProductModel.createPayload(req.body);
          let elaticDoc = await this.createElasticDocData(savedProduct);
          elaticDoc.id = result._id;
          elaticDoc = new Elastic(elaticDoc);
          elasticResult = await elasticService.updateDocument(JSON.stringify(elaticDoc), req.body.Category)
        }
        else {
          console.log('Here.... ADD')
          const savedProduct = await ProductModel.createPayload(result);
          let elaticDoc = await this.createElasticDocData(savedProduct);
          elaticDoc.id = result._id;
          elaticDoc = new Elastic(elaticDoc);
          elasticResult = await elasticService.createDocument(JSON.stringify(elaticDoc), req.body.Category)
        }
        const response = new Response(1, "Product is saved successfully", "", "", { product: result, elasticResult: elasticResult });
        return res.status(200).send(response);
      }
      const response = new Response(0, "Error in saving Product", 0, "Product not saved", {});
      return res.status(200).send(response);
    } catch (error) {
      const response = new Response(0, "Unexpected Error", 0, error, {});
      return res.status(400).send(response);
    }
  }
  async createElasticDocData(ob) {
    var toReturn = {};
    for (var i in ob) {
      if (!ob.hasOwnProperty(i)) continue;
      if ((typeof ob[i]) == 'object') {
        var flatObject = await this.createElasticDocData(ob[i]);
        for (var x in flatObject) {
          if (!flatObject.hasOwnProperty(x)) continue;
          toReturn[i + '_' + (x.toLocaleLowerCase()).replace(/ /g, "_").replace(/ *\([^)]*\) */g, "")] = flatObject[x].toString();
        }
      } else {
        toReturn[i] = ob[i];
      }
    }
    return toReturn;
  }
  async getProducts(req, res) {
    let { brand, category, os, cpu, gpu } = req.body
    try {
      let skip = req.query.index ? parseInt(req.query.index) : 0;
      const result = await ProductService.getProducts(brand, category, os, cpu, gpu, skip);
      if (result) {
        const response = new Response(1, "Product list", "", "", { product: result });
        return res.status(200).send(response);
      }
      const response = new Response(1, "Product list", "", "", {});
      return res.status(200).send(response);
    } catch (error) {
      const response = new Response(0, "Unexpected Error", 0, error, {});
      return res.status(400).send(response);
    }
  }
  async getProductBrands(req, res) {
    try {
      const result = await ProductService.getProductByBrand();
      if (result) {
        const response = new Response(1, "Brand list", "", "", { brands: result });
        return res.status(200).send(response);
      }
      const response = new Response(1, "Brand list", "", "", {});
      return res.status(200).send(response);
    } catch (error) {
      const response = new Response(0, "Unexpected Error", 0, error, {});
      return res.status(400).send(response);
    }
  }
  async getAllOS(req, res) {
    try {
      const result = await ProductService.getAllOs();
      if (result) {
        const response = new Response(1, "OS list", "", "", { OS: result });
        return res.status(200).send(response);
      }
      const response = new Response(1, "OS list", "", "", {});
      return res.status(200).send(response);
    } catch (error) {
      const response = new Response(0, "Unexpected Error", 0, error, {});
      return res.status(400).send(response);
    }
  }
  async getAllCPU(req, res) {
    try {
      const result = await ProductService.getAllCpu();
      if (result) {
        const response = new Response(1, "CPU list", "", "", { CPU: result });
        return res.status(200).send(response);
      }
      const response = new Response(1, "CPU list", "", "", {});
      return res.status(200).send(response);
    } catch (error) {
      const response = new Response(0, "Unexpected Error", 0, error, {});
      return res.status(400).send(response);
    }
  }
  async getAllGPU(req, res) {
    try {
      const result = await ProductService.getAllGpu();
      if (result) {
        const response = new Response(1, "GPU list", "", "", { GPU: result });
        return res.status(200).send(response);
      }
      const response = new Response(1, "GPU list", "", "", {});
      return res.status(200).send(response);
    } catch (error) {
      const response = new Response(0, "Unexpected Error", 0, error, {});
      return res.status(400).send(response);
    }
  }
  async getAllBattery(req, res) {
    try {
      const result = await ProductService.getAllBatteryType();
      if (result) {
        const response = new Response(1, "Battery list", "", "", { Battery: result });
        return res.status(200).send(response);
      }
      const response = new Response(1, "Battery list", "", "", {});
      return res.status(200).send(response);
    } catch (error) {
      const response = new Response(0, "Unexpected Error", 0, error, {});
      return res.status(400).send(response);
    }
  }
  async getProduct(req, res) {
    const { productId } = req.params;
    try {
      let result = ''
      let version = ''
      if (productId) result = await ProductService.getProductById(productId);
      if (result.Product && result.Product.Model) version = await ProductService.getProductByModel(result.Product.Model)
      delete result.Product
      let product = version ? version : [result];
      if (result) {
        function iterate (targetObj, originObj) {
          for (let i = 0; i < Object.keys(targetObj).length; i++) {
            let key = Object.keys(targetObj)[i];
            if (typeof targetObj[key] === 'object' && typeof originObj[key] === 'object') {
              targetObj[key] = iterate(targetObj[key], originObj[key]);
            }
            if (typeof targetObj[key] !== 'object' && typeof originObj[key] !== 'undefined') {
              targetObj[key] = originObj[key];
            }
          }
          return targetObj;
        }
        // let newProducts = [];
        product = product.map(p=> {
          return iterate(JSON.parse(JSON.stringify(ProductSampleData)), p);
        })
        const response = new Response(1, "Product list", "", "", { product:  product});
        return res.status(200).send(response);
      }
      const response = new Response(1, "Product list", "", "", {});
      return res.status(200).send(response);
    } catch (error) {
      const response = new Response(0, "Unexpected Error", 0, error, {});
      return res.status(400).send(response);
    }
  }
  async getTrendingProducts(req, res) {
    try {
      const result = await ProductService.trendingProducts();
      if (result) {
        const response = new Response(1, "Trending Products", "", "", { product: result });
        return res.status(200).send(response);
      }
      const response = new Response(1, "Trending Products", "", "", {});
      return res.status(200).send(response);
    } catch (error) {
      const response = new Response(0, "Unexpected Error", 0, error, {});
      return res.status(400).send(response);
    }
  }
  async deleteAllProducts(req, res) {
    try {
      const result = await ProductService.deleteAllProducts();
      const response = new Response(1, "All product Deleted", "", "", { result });
      return res.status(200).send(response);
    } catch (error) {
      const response = new Response(0, "Unexpected Error", 0, error, {});
      return res.status(400).send(response);
    }
  }
  async getFeaturedProducts(req, res) {
    try {
      const result = await ProductService.featuredProducts();
      if (result) {
        const response = new Response(1, "Featured Products", "", "", { product: result });
        return res.status(200).send(response);
      }
      const response = new Response(1, "Featured Products", "", "", {});
      return res.status(200).send(response);
    } catch (error) {
      const response = new Response(0, "Unexpected Error", 0, error, {});
      return res.status(400).send(response);
    }
  }
  async DeleteProduct(req, res) {
    const { productId } = req.params;
    try {
      const result = await ProductService.deleteProduct(productId);
      if (result) {
        const elasticResult = await elasticService.deleteDocument(productId, req.body.category)
        const response = new Response(1, "Product deleted successfully", "", "", { product: 'Product deleted successfully', elasticResult: elasticResult });
        return res.status(200).send(response);
      }
    } catch (error) {
      const response = new Response(0, "Unexpected Error", 0, error, {});
      return res.status(400).send(response);
    }
  }
  async searchProduct(req, res) {
    const { query } = req.query;
    const { category } = req.body;

    try {
      const result = await elasticService.searchEngine(query, category);
      const response = new Response(1, "product matched", "", "", result);
      return res.status(200).send(response);
    } catch (error) {
      const response = new Response(0, "Unexpected Error", 0, error, {});
      return res.status(400).send(response);
    }
  }
}

module.exports = new ProductController();
