const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true },
  gender: { type: String }, 
  contactEmail: { type: String },
  physicalAddress: { type: String },
  website: { type: String },
  phone: { type: String },
  password: { type: String },
  status: { type: String, enum: ["Active", "Inactive", "Deleted"], default: "Active" },
  role: { type: String, enum: ["Individual", "Business"], default: "Individual" },
  country: { type: String },
  products: { type : Array, default: [] },
  categories: { type : Array, default: [] },
  brands: { type : Array, default: [] },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
  avatar: { type: String },
  currency: { type: String },
});
// UserSchema.statics.hashPassword = async function (password) {
//   const hashedPassword = await bcrypt.hash(password, 10);
//   return hashedPassword;
// };
// UserSchema.statics.comparePassword = async function (password, dbPassword) {
//   return bcrypt.compareSync(password, dbPassword);
// };
UserSchema.statics.createPayload = async function (user) {
  const payload = {
    id: user._id,
    email: user.email,
  };
  return payload;
};
const User = mongoose.model("User", UserSchema, "User");
module.exports = { User };
