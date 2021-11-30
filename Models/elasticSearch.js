const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const ElasticSchema = new mongoose.Schema({
    id: { type: String },
    brand: { type: String },
    model: { type: String },
    version: { type: String },
    generation: { type: String },
    category: { type: String },
    display_touchscreen_type: { type: String },
    camera_back_camera_resolution: { type: String },
    camera_front_camera_resolution: { type: String },
    battery_design: { type: String },
    storage_capacity: { type: String },
    processor_cpu_chip: { type: String },
    image_front: { type: String },
    image_back: { type: String },
    
},{ _id : false });
const Elastic = mongoose.model("Elastic", ElasticSchema, "Elastic");
module.exports = { Elastic };
