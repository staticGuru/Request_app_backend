const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const organizationRoutes = require("./routes/organizationRoutes");
const clinicRoutes = require("./routes/clinicRoutes");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 6000;
const cors = require('cors')

app.use(express.json());
app.use(cookieParser());
app.use(  cors({    origin: "*" }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
  });

const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};

app.use(cors(corsOpts));
// user API
app.use("/api/user/", userRoutes);
app.use("/api/org/", organizationRoutes);
app.use("/api/clinic/", clinicRoutes);


app.listen(port, () => {
  console.log(`server listening on ${port}`);
  // mongoose
  //   .connect(process.env.MONGODB_URI)
  //   .then(() => console.log("connected to mongodb"))
  //   .catch(() => console.log("DB not connected"));
});
