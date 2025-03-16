import express from "express";


const router = express.Router();
import Razorpay  from "razorpay";
import crypto from "crypto";

//Creating Order
router.post("/orders", async (req, res) => {
  try {
    console.log("Creating Razorpay order with payload:", req.body);

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: req.body.amount, // Ensure amount is in paise
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    instance.orders.create(options, (error, order) => {
      if (error) {
        console.error("Razorpay order creation error:", error);
        return res.status(500).json({ message: "Something Went Wrong!" });
      }
      console.log("Razorpay order created:", order);
      res.status(200).json({ data: order });
    });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
});

//Verifying the payment
router.post("/verify",async(req,res) => {
    try {
        const {
            razorpay_orderID,
            razorpay_paymentID,
            razorpay_signature } = req.body;
        const sign = razorpay_orderID + "|" + razorpay_paymentID;
        const resultSign = crypto
        .createHmac("sha256",process.env.RAZORPAY_KEY_SECRET)
        .update(sign.toString())
        .digest("hex");

        if (razorpay_signature == resultSign){
            return res.status(200).json({message:"Payment verified successfully"});
        }

    } catch(error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error!"});
    }
});
export default router