const user = require("./user");
const account = require("./account");
const product = require("./product");
const category = require("./category");

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.status(200).send({
      message: "Welcome to the Techspecs APIs. Register or Login to use the APIS.",
    });
  });
  app.use("/api/user", user);
  app.use("/api/account", account);
  app.use("/api/product", product);
  app.use("/api/category", category);
};
