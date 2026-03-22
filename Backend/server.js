const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("Frontend"));

mongoose.connect("mongodb://127.0.0.1:27017/gymDB");

const User = require("./models/User");
const Booking = require("./models/Booking");

// Register
app.post("/api/register", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send({ msg: "Registered" });
});

// Login
app.post("/api/login", async (req, res) => {
  const user = await User.findOne(req.body);

  if (user) {
    const token = jwt.sign({ id: user._id }, "secret");
    res.send({ token });
  } else {
    res.send({ error: "Invalid user" });
  }
});

// Middleware
function auth(req, res, next) {
  try {
    const decoded = jwt.verify(req.headers.authorization, "secret");
    req.userId = decoded.id;
    next();
  } catch {
    res.send({ error: "Unauthorized" });
  }
}

// Booking
app.post("/api/book", auth, async (req, res) => {
  const booking = new Booking({
    userId: req.userId,
    plan: req.body.plan
  });

  await booking.save();
  res.send({ msg: "Booked" });
});

// Admin data
app.get("/api/bookings", async (req, res) => {
  res.send(await Booking.find());
});

app.listen(5000, () => console.log("Server running"));