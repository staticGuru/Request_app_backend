const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const user = require("../models/userSchema");


exports.signUpController = async(req,res)=>{
 
    const { email, password, confirmPassword, role,userName, companyName, isAgree } =
      req.body;
    try {
      if(password != confirmPassword){
        res
          .status(401)
          .send({ status: false, message: "Confirm Password and Password do not match" });
          return;
      }else{
      const userExist = await user.findOne({ email: email });
      if (userExist) {
        res
          .status(409)
          .send({ status: false, message: "User Already Exists!!" });
        return;
      }
      
      //const userRole = role === "as company" ? "admin" : "user";
      const hashPassword = await bcrypt.hash(password, 12);
  
      if(isAgree === false){
        res
          .status(401)
          .send({ status: false, message: "Agree to the terms and conditions" });
        return;
      }else{
      const newCreatedUser = await user.create({
        email,
        password: hashPassword,
        role,
        userName,
        companyName,
        isAgree,
      })
      const newUser = await newCreatedUser.save();

      res.status(200).json({ status: true, result: "User Created" });
    }};

    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ status: false, message: err.message });
    }
}
