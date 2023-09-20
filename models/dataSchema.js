const mongoose = require("mongoose");

const dataSchema = mongoose.Schema(
  {
   
   fullname: {
        type: String,
      //   required: true
   },
   description: {
        type: String,
      //   required: true
   },
   customerid: {
        type: Number,
      //   required: true
   }
  },
  { timestamps: true, collection: 'data' }
);
module.exports = mongoose.model("Data", dataSchema);
