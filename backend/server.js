const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const userRouter = require("./routes/userRouter");
const testRouter = require("./routes/testRouter");

const app = express();

app.enable("trust proxy");

// app.enable('trust proxy');

// Parser JSON
app.use(express.json());
app.use(express.urlencoded({ limit: "10kb", extended: true }));
// Set cookie on req
app.use(cookieParser());

// // Handle CORS
app.use(cors());

app.options("*", cors());

const limit = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 60,
  message: "Too many request with this IP Address..Try again in 1 hour",
});

app.use("/api", limit);

app.use("/api/v1/users", userRouter);
app.use("/api/v1/test", testRouter);

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(compression());

app.all("*", (req, res) => {
  res.status(400).json({
    status: "fail",
    message: `Cannot find ${req.originalUrl}`,
  });
});

app.get("/", (req, res) => {
  res.status(200).json({
    message: "App started"
  })
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening from port ${port}`);
});
