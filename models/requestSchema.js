const mongoose = require("mongoose");
const users = require("../models/userSchema");

const requestSchema = mongoose.Schema(
  {
    shortDescription: {
      type: String,
      //   required: true
    },
    status: {
      type: String,
      //   required: true
    },
    requestNumber: {
      type: Number,
      //   required: true
    },
    title: {
      type: String,
      //   required: true
    },
    companyName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // this name should be same as the model name specified while declaring model
    },
    email: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // this name should be same as the model name specified while declaring model
    },
  },
  { timestamps: true, collection: "requests" }
);
module.exports = mongoose.model("Request", requestSchema);
