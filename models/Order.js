const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Types.ObjectId, ref: "customer", reqiured: true },
  address: { type: String, reqiured: true },
  city: { type: String, reqiured: true },
  payment: { type: String, reqiured: true },
  products: { type: [mongoose.Types.ObjectId], ref: "product", reqiured: true },
  status: { type: String, enum: ["placed", "delivered", "cancel"], default: "placed" },
},{timestamps: true});
module.exports = mongoose.model("order", orderSchema);
