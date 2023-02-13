const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
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
    email: { 
        type: String, 
        required: true
     },
     userName:{
      type:String,
      required: true
     },
    password: { 
        type: String, 
        required: true
     },
   //  confirmPassword: { 
   //      type: String, 
   //      //required: true
   //   },
    role: { 
        type: String, 
        required: true
     },
    companyName: { 
        type: String,
        required: true
     },
     isAgree: { 
        type: Boolean,
        required: true,
        default: false
     },
  },
  { timestamps: true, collection: 'users' }
);
module.exports = mongoose.model("User", userSchema);
