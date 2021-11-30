const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const BrandFollowSchema = new mongoose.Schema({
  name: { type: String },
  follower: { type: String },
});

const BrandFollow = mongoose.model(
  "BrandFollow",
  BrandFollowSchema,
  "BrandFollow"
);
module.exports = { BrandFollow };
