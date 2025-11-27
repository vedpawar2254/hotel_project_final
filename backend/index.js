const express = require('express');
const app = express();

const cors = require('cors');
const connectDB = require('./config/db');
const bookingModel = require('./models/Booking');

// 🔗 Connect to MongoDB
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hieee");
});

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


app.listen(3000, () => console.log("Server running on port 3000"));
