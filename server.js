const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");
const fs = require("fs");

// dotenv config
dotenv.config();
const app = express();

// MongoDB connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/user", require("./routes/userRoute"));
app.use("/api/v1/admin", require("./routes/AdminRoute"));
app.use("/api/v1/hero", require("./routes/contactFormRoute"));
app.use("/api/v1/", require("./routes/PostRoute"));
app.use("/api/v1/feeds", require("./routes/FeedRoute"));

// Serve static files from the 'dist' directory
const distPath = path.join(__dirname, "dist");
console.log("Serving static files from:", distPath);

// Verify if dist directory exists
if (fs.existsSync(distPath)) {
  console.log("Dist directory exists");
} else {
  console.error("Dist directory does not exist");
}

app.use(express.static(distPath));

// Catchall handler: for any request that doesn't match above, send back index.html
app.get("*", (req, res) => {
  const indexPath = path.join(distPath, "index.html");
  console.log("Request received for:", req.originalUrl);
  console.log("Index file path:", indexPath);

  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send("index.html not found");
  }
});

// Port
const port = process.env.PORT || 8080;

// Start server
app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
