const mongoose = require("mongoose");

const pricingSchema = new mongoose.Schema({
  storeId: {
    type: String,
    required: true,
  },
  sku: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

pricingSchema.index({ storeId: 1, sku: 1 }, { unique: true });

module.exports = mongoose.model("Pricing", pricingSchema);
