const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const userModel = require('./models/User')
const bookingModel = require('./models/Booking')

connectDB();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// routes
app.use("/booking", require("./routes/booking"));

app.post("/api/auth/google", async (req, res) => {
  try {
    const { token } = req.body;

    // Verify and decode the token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();  // decoded user data from Google

    console.log("Decoded Google user:", payload);
    // payload.given_name
    // payload.name

    let user = await userModel.findOne({email: payload.email})
    if(!user){
      userModel.create({
        name: payload.given_name,
        email: payload.email
      })
    }
    
    res.json({ success: true, user: payload });
    
  } catch (err) {
    console.error("❌ Google token error:", err);
    res.status(400).json({ success: false, message: "Invalid token" });
  }
});

app.get("/dashboard" , async (req , res) => {
  let bookings = await bookingModel.find()
  res.json(bookings)
})

app.post("/api/bookings", async (req, res) => {
  try {
    console.log("Data received:", req.body);

    const { firstName, lastName, email, phone, checkIn, checkInTime, checkOut, checkOutTime } = req.body;

    const booking = await bookingModel.create({
      firstName,
      lastName,
      email,
      phone,
      checkIn: new Date(`${checkIn}T${checkInTime}`),
      checkOut: new Date(`${checkOut}T${checkOutTime}`)
    });

    res.status(201).json({ message: "Booking received successfully", booking });
  } catch (err) {
    console.error("Booking Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

app.listen(3000, () => console.log("🚀 Server running on port 3000"));
