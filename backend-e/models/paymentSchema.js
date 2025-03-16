import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Link to user
  cart: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true }, // Total amount in INR
  paymentMethod: { type: String, required: true }, // UPI, Bank Transfer, Card
  status: { type: String, default: "Pending" }, // Payment status
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Payment", paymentSchema);