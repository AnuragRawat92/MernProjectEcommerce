import Payment from "../models/paymentSchema.js";

// Create a payment
export const createPayment = async (req, res) => {
  const { userId, cart, totalAmount, paymentMethod } = req.body;

  try {
    // Simulate payment success/failure (for demo purposes)
    const isPaymentSuccessful = Math.random() > 0.2; // 80% success rate

    if (!isPaymentSuccessful) {
      return res.status(400).json({ message: "Payment failed. Please try again later." });
    }

    // Save payment details to the database
    const payment = new Payment({
      userId,
      cart,
      totalAmount,
      paymentMethod,
      status: "Success",
    });

    await payment.save();

    // Return success message and payment details
    res.status(201).json({
      message: "Congratulations! Payment successful.",
      paymentDetails: {
        paymentMethod,
        totalAmount,
        ...(paymentMethod === "UPI" && { upiId: "anuragrawat92946@oksbi" }),
        ...(paymentMethod === "Bank Transfer" && {
          accountNumber: "41279346297",
          accountName: "Anurag Rawat",
        }),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Payment failed. Please try again later.", error });
  }
};