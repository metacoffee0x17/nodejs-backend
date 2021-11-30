const Response = require("../Middlewares/response");
const elasticService = require("../Services/elasticAppSearch")
class CategoryController {
  constructor() {}
  async saveCategory(req, res) {
    const { name } = req.body;
    try {
      const result = await elasticService.createEngine(name);
      if (result) {
        const response = new Response(1, "Category is saved successfully", "", "", { Category: result });
        return res.status(200).send(response);
      }
      const response = new Response(0, "Error in saving Category", 0, "Category not saved", {});
      return res.status(200).send(response);
    } catch (error) {
      console.log(error)
      const responseError = error.response ? error.response.data.errors : error
      const response = new Response(0, "Unexpected Error", 0, responseError, {});
      return res.status(400).send(response);
    }
  }
  async getCategory(req, res) {
    try {
      const result = await elasticService.getEngineList();
      if (result) {
        const response = new Response(1, "Category list", "", "", { Category: result });
        return res.status(200).send(response);
      }
      const response = new Response(1, "Category list", "", "", {});
      return res.status(200).send(response);
    } catch (error) {
      const response = new Response(0, "Unexpected Error", 0, error, {});
      return res.status(400).send(response);
    }
  }
  async deleteCategory(req, res) {
    try {
      const result = await elasticService.deleteEngine();
      if (result) {
        const response = new Response(1, "Category list", "", "", { Category: result });
        return res.status(200).send(response);
      }
      const response = new Response(1, "Category list", "", "", {});
      return res.status(200).send(response);
    } catch (error) {
      const response = new Response(0, "Unexpected Error", 0, error, {});
      return res.status(400).send(response);
    }
  }
}

module.exports = new CategoryController();
