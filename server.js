const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");

// dotenv config
dotenv.config();
const app = express();

app.use(cors());

// MongoDB connection
connectDB();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/user", require("./routes/userRoute"));
app.use("/api/v1/admin", require("./routes/AdminRoute"));
app.use("/api/v1/hero", require("./routes/contactFormRoute"));
app.use("/api/v1/", require("./routes/PostRoute"));
app.use("/api/v1/feeds", require("./routes/FeedRoute"));

app.use(express.static(path.join(__dirname, "/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/dist", "index.html"));
});

// Port
app.listen(process.env.PORT, () => {
  console.log("Server is running at 8000");
});
