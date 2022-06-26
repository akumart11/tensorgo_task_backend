const express = require("express");
var cors = require("cors");

const userRouter = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/users", userRouter);

app.all("*", (req, res) => {
  res.status(404).json({
    status: "Route Not Found",
  });
});

module.exports = app;
