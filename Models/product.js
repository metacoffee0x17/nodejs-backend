const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const ProductSchema = new mongoose.Schema({
  Display: { type: Object, required: true },
  Design: { type: Object, required: true },
  Camera: { type: Object, required: true },
  Inside: { type: Object, required: true },
  Time: { type: Object, required: true },
  Yes: { type: Object, required: true },
  No: { type: Object, required: true },
  Product: { type: Object, required: true },
  Image:{ type: Object},
  Rank:{ type: Object},
  Description:{ type: Object},
  Featured: { type: Boolean, default: 0 },
  Trending: { type: Boolean, default: 0 },
  Category: { type: String,required:true },
  Active: { type: Boolean, default: 1 },
  Created_at: { type: Date, default: Date.now() },
  Updated_at: { type: Date, default: Date.now() },
});

ProductSchema.statics.createPayload = async function (Product) {
  const payload = {
    ...(Product.Display ? { display: Product.Display } : {}),
    ...((Product.Product && Product.Product.Brand) ? { brand: Product.Product.Brand } : {}),
    ...((Product.Product && Product.Product.Model) ? { model: Product.Product.Model } : {}),
    ...((Product.Product && Product.Product.Version) ? { version: Product.Product.Version } : {}),
    ...((Product.Product && Product.Product.Generation) ? { generation: Product.Product.Generation } : {}),
    ...(Product.Category ? { category: Product.Category } : {}),
    ...((Product.Inside && Product.Inside.Battery && Product.Inside.Battery.Design) ? { battery_design: Product.Inside.Battery.Design } : {}),
    ...((Product.Inside && Product.Inside.storage && Product.Inside.storage.Capacity) ? { storage_capacity: Product.Inside.Storage.Capacity } : {}),
    ...(Product.Camera ? { camera: Product.Camera } : {}),
    ...(Product.Image ? { image: Product.Image } : {}),
    ...((Product.Inside && Product.Inside.Processor)  ? { processor: Product.Inside.Processor } : {})
  }

  return payload;
};

let ProductSampleData = {
  "featured": false,
  "trending": false,
  "new": true,
  "active": true,
  "created_at": "",
  "updated_at": "",
  "_id": "",
  "Featured": false,
  "Trending": true,
  "Active": true,
  "Created_at": "",
  "Updated_at": "",
  "Camera": {
      "Back Camera": {
          "Module": "",
          "Sensor": "",
          "Resolution": "",
          "Resolution (H x W)": "",
          "Video Resolution": "",
          "Equivalent Focal Length": "",
          "Minimum Focal Length": "",
          "Pixel Size": "",
          "Aperture (T)": "",
          "Aperture (W)": "",
          "Zoom": "",
          "Sensor Format": "",
          "Features": "",
          "Flash": "",
          "Focus": "",
          "Image Format": "",
          "Video Format": ""
      },
      "Back Camera II": {
          "Module": "",
          "Sensor": "",
          "Resolution": "",
          "Equivalent Focal Length": "",
          "Pixel Size": "",
          "Aperture (W)": "",
          "Sensor Format": "",
          "Features": "",
          "Focus": ""
      },
      "Back Camera III": {
          "Sensor": "",
          "Equivalent Focal Length": "",
          "Resolution": "",
          "Pixel Size": "",
          "Sensor Format": "",
          "Aperture (W)": "",
          "Focus": "",
          "Features": ""
      },
      "Back Camera IV": {
          "Sensor": "",
          "Resolution": "",
          "Equivalent Focal Length": "",
          "Pixel Size": "",
          "Aperture (W)": "",
          "Features": "",
          "Focus": ""
      },
      "Back Camera V": {
          "Sensor": "",
          "Resolution": "",
          "Pixel Size": "",
          "Aperture (W)": "",
          "Focus": "",
          "Features": ""
      },
      "Front Camera": {
          "Module": "",
          "Sensor": "",
          "Resolution": "",
          "Minimum Focal Length": "",
          "Resolution (H x W)": "",
          "Video Resolution": "",
          "Pixel Size": "",
          "Aperture (W)": "",
          "Sensor Format": "",
          "Image Format": "",
          "Video Format": "",
          "Flash": "",
          "Focus": "",
          "Features": ""
      },
      "Front Camera II": {
          "Sensor": "",
          "Resolution": "",
          "Pixel Size": "",
          "Aperture (W)": ""
      },
      "Front Camera III": {
          "Sensor": "",
          "Resolution": "",
          "Aperture (W)": ""
      }
  },
  "Description": {
      "I": "",
      "II": "",
      "III": "",
      "IV": "",
      "IX": "",
      "V": "",
      "VI": "",
      "VII": "",
      "VIII": "",
      "X": "",
      "XI": "",
      "XII": "",
      "XIII": "",
      "XIV": "",
      "XIX": "",
      "XV": "",
      "XVI": "",
      "XVII": "",
      "XVIII": "",
      "XX": "",
      "XXI": "",
      "XXII": "",
      "XXIII": "",
      "XXIV": "",
      "XXV": ""
  },
  "Design": {
      "Height": "",
      "Width": "",
      "Thickness": "",
      "Weight": "",
      "Color(s)": "",
      "IP Rating": "",
      "Keyboard": {
          "Design": "",
          "Backlight": "",
          "Keys": ""
      },
      "Keyboard II": {
          "Design": "",
          "Backlight": "",
          "Keys": ""
      }
  },
  "Display": {
      "Puch holes(s)": "",
      "Notch(es)": "",
      "Diagonal": "",
      "Height": "",
      "Width": "",
      "Bezel Width": "",
      "Screen to Body Ratio": "",
      "Refresh Rate": "",
      "Resolution (H x W)": "",
      "Pixel Size": "",
      "Dynamic Range": "",
      "Color Depth": "",
      "Pixel Density": "",
      "Number of Colors": "",
      "Glass": "",
      "Illumination": "",
      "LCD Mode": "",
      "Module": "",
      "Subpixels": "",
      "Touch Points": "",
      "Touch Point(s)": "",
      "Touch screen Type": "",
      "Type": "",
      "Screen": {
          "Module": "",
          "Type": "",
          "Diagonal": "",
          "Height": "",
          "Width": "",
          "Number of Colors": "",
          "Resolution (H x W)": "",
          "Pixel Density": "",
          "Color Depth": "",
          "Dynamic Range": "",
          "Pixel Size": "",
          "Glass": "",
          "Illumination": "",
          "LCD Mode": "",
          "Subpixels": ""
      }
  },
  "Inside": {
      "Battery": {
          "Type": "",
          "Style": "",
          "Capacity": "",
          "Cell I": "",
          "Cell II": "",
          "Standby Time": "",
          "Talk Time": "",
          "Life": "",
          "Current": "",
          "Standby Current Consumption": "",
          "Wireless Charging Power": "",
          "Charging Power": "",
          "Energy": "",
          "Voltage": "",
          "Power IC": "",
          "Wireless Charging": ""
      },
      "Cellular": {
          "Dual Sim Type": "",
          "SIM Module": "",
          "SIM Slot": "",
          "SIM Frequencies": "",
          "SIM Mobile Data": "",
          "SIM II Module": "",
          "SIM II Slot": "",
          "SIM II Frequencies": "",
          "SIM II Mobile Data": ""
      },
      "Location": {
          "Module": "",
          "Parallel GPS Channels": "",
          "Navigation": "",
          "GPS": "",
          "Galileo": "",
          "BeiDou": "",
          "GLONASS": "",
          "GPS Feature(s)": ""
      },
      "Processor": {
          "CPU": "",
          "CPU Clock Speed": "",
          "GPU": "",
          "GPU Clock Speed": "",
          "GPU Dedicated Memory": "",
          "GPU Framebuffer": ""
      },
      "RAM": {
          "Module": "",
          "Capacity": "",
          "Type": "",
          "Clock Speed": ""
      },
      "SAR": {
          "Body (EU)": "",
          "Head (EU)": "",
          "Hotspot (USA)": "",
          "Body (USA)": "",
          "Head (USA)": ""
      },
      "Sensor(s)": {
          "Present": "",
          "Sensor(s)": "",
          "Accelerometer": "",
          "Compass": "",
          "Gyroscope": "",
          "Barcode Scanners": ""
      },
      "Software": {
          "OS": "",
          "OS Version": "",
          "Kernel Version": ""
      },
      "Storage": {
          "Module": "",
          "Type": "",
          "Capacity I": "",
          "Capacity II": "",
          "Capacity III": "",
          "Capacity": "",
          "Bus Speed": "",
          "Expansion": ""
      },
      "Wireless": {
          "Bluetooth Module": "",
          "Bluetooth Version": "",
          "Bluetooth Profiles": "",
          "WLAN Module": "",
          "WiFi": "",
          "WMAN": "",
          "WiFi Feature(s)": "",
          "Experience(s)": "",
          "FM Radio": "",
          "FM Radio Transmitter": "",
          "Infrared": "",
          "Analog TV": "",
          "NFC": "",
          "Digital TV": ""
      }
  },
  "Product": {
      "Brand": "",
      "RawModel": "",
      "URL": "",
      "Image URL": "",
      "OEM ID": "",
      "Region": "",
      "Country": "",
      "Designer": "",
      "Manufacturer": "",
      "Carrier": "",
      "Model": "",
      "Version": "",
      "Generation": "",
      "Category": "",
      "Storage": "",
      "SIM Type": ""                                              
  },
  "Time": {
      "Announced": "",
      "Released": "",
      "Added": "",
      "Scraped": ""
  },
  "Image": {
      "Front": "",
      "Back": "",
      "Front Size": "",
      "Back Size": "",
      "RawFront": "",
      "RawBack": "",
      "RawFrontBack": ""
  },
  "Rank": {
      "Price": "",
      "Battery": "",
      "Storage": "",
      "Back Camera I": "",
      "Front Camera I": "",
      "Display": "",
      "CPU": "",
      "RAM": "",
      "GPU": "",
      "Extra I": "",
      "Extra II": "",
      "Extra III": ""
  },
  "Yes": {
      "Audio": {
          "Module": "",
          "Output": "",
          "Channel": "",
          "AV Resolution": "",
          "ADC Frequency": "",
          "ADC Resolution": "",
          "DAC Frequency": "",
          "DAC Resolution": "",
          "Loudspeaker Power": "",
          "Loudspeaker(s)": "",
          "AV Out": "",
          "Hearing Aid Compatibility": "",
          "Microphone(s)": "",
          "Microphone Input": ""
      },
      "Experiences": {
          "Present": ""
      },
      "Peripheral(s)": {
          "Present": "",
          "D Pad": "",
          "Scrolling & Navigation": ""

      },
      "Port(s)": {
          "USB Type": "",
          "USB Version": "",
          "USB Feature(s)": "",
          "USB Type (Port II)": "",
          "USB Version (Port II)": "",
          "USB Features (Port II)": "",
          "Modem": "",
          "Modem Standard": "",
          "Ethernet Standard": "",
          "Ethernet": "",
          "Serial Standard": "",
          "Serial Connector": "",
          "Serial Bit Rate": "",
          "Fax Modem Standard": ""
        }
  },
  "No": {
      "AV Out": ""
  },
  "Category": "",
  "__v": 0,
  "design": []
};
const ProductModel = mongoose.model("Product", ProductSchema, "Product");
module.exports = { ProductModel, ProductSampleData };
