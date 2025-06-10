var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

// Make Swagger optional
let swaggerUi;
let swaggerJsdoc;
try {
  swaggerUi = require("swagger-ui-express");
  swaggerJsdoc = require("swagger-jsdoc");
} catch (error) {
  console.log("Swagger modules not available");
}

var app = express();

// Only setup Swagger if modules are available
if (swaggerUi && swaggerJsdoc) {
  const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "LangBook API",
        version: "1.0.0",
        description: "API documentation for LangBook Express app",
      },
      servers: [
        {
          url: process.env.API_URL || "http://localhost:3000",
        },
      ],
    },
    apis: ["./routes/*.js"],
  };

  try {
    const swaggerSpec = swaggerJsdoc(swaggerOptions);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log("Swagger documentation available at /api-docs");
  } catch (error) {
    console.log("Error setting up Swagger:", error.message);
  }
}

app.use(cors());

app.use("/uploads", express.static("public/images"));

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var codeRouter = require("./routes/code");
var languageRouter = require("./routes/language");
var vivaRouter = require("./routes/vivaQuestion");
var interviewRouter = require("./routes/interviewQestion");
var adminRouter = require("./routes/admin");
var courseRouter = require("./routes/courses");
const langdetail = require("./routes/langdetail");
var categoryRouter = require("./routes/category");

const mongoose = require("mongoose");

mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb+srv://kirangohil652:c3LEmB5NuxjyIszO@langbook.zeqvfp2.mongodb.net/LangBook",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(error.message));

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/code", codeRouter);
app.use("/language", languageRouter);
app.use("/vivaQuestion", vivaRouter);
app.use("/Interview", interviewRouter);
app.use("/admin", adminRouter);
app.use("/courses", courseRouter);
app.use("/langdetail", langdetail);
app.use("/category", categoryRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
