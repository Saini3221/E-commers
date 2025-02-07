const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(

  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    item: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      name: String,
      price: Number,
      image: String,
    },
    quantity: { type: Number, required: true, min: 1 },
  },


);

const Cart = mongoose.model("cart", cartSchema);

module.exports = Cart;
