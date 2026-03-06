// setGlobalOptions({ maxInstances: 10 });
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

// Optional Firebase Functions configuration


const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Success abudy!",
  });
});

// Create payment intent
app.post("/payment/create", async (req, res) => {
  const total = Number(req.query.total);

  if (total > 0) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
      });
      console.log(paymentIntent);

      res.status(201).json({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Payment failed" });
    }
  } else {
    res.status(403).json({
      message: "Total must be above 0",
    });
  }
});

// Local server (for testing)
// Only use app.listen when running locally, remove/comment for Firebase deployment
app.listen(5000, () => {
    console.log("Server is running on PORT:5000, http://localhost:5000");
});

// Firebase export (uncomment when deploying to Firebase)
// exports.api = onRequest(app);