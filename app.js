const express = require("express");
const mongoose = require("mongoose");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const expressValidator = require("express-validator");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const path = require("path");
dotenv.config({ path: "./.env" });

//DB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Database Connected"));

mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err.message}`);
});

const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

app.use("/api", postRoutes);
app.use("/api", authRoutes);
app.use("/api", userRoutes);

app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: "Unauthorized" });
  }
  next();
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
