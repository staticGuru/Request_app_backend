const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const user = require("../models/userSchema");

// module.exports = {
//   signupController: async (req, res) => {
//     const validationError = validationResult(req);
//     if (!validationError.isEmpty()) {
//       res.status(400).json({
//         status: false,
//         errors: validationError.array(),
//       });
//       return;
//     }
//     const { email, password, confirmPassword, role, companyName, isAgree } =
//       req.body;

//     try {
//       const userExist = await userSchema.findOne({ email: email });
//       if (userExist) {
//         res
//           .status(409)
//           .send({ status: false, message: "User Already Exists!!" });
//         return;
//       }
//       const userRole = role === "as company" ? "admin" : "user";
//       const hashPassword = await bcrypt.hash(password, 12);
//       const newCreatedUser = new userSchema({
//         email,
//         password: hashPassword,
//         confirmPassword,
//         role: userRole,
//         companyName,
//         isAgree,
//       });

//       const newUser = await newCreatedUser.save();
//       res.status(200).json({ status: true, result: newUser });
//     } catch (err) {
//       console.log(err);
//       res
//         .status(500)
//         .json({ status: false, message: "Something went wrong !" });
//     }
//   },

//   loginController: async (req, res) => {
//     const validationError = validationResult(req);
//     if (!validationError.isEmpty()) {
//       res.status(400).json({
//         status: false,
//         errors: validationError.array(),
//       });
//       return;
//     }

//     const { email, password } = req.body;

//     try {
//       const user = await userSchema.findOne({ email: email });
//       if (!user) {
//         res.status(401).json({
//           status: false,
//           message: "Invalid credentials, Please enter valid credentials.",
//         });
//         return;
//       }
//       const isPasswordValid = await bcrypt.compare(password, user.password);
//       if (!isPasswordValid) {
//         res.status(400).json({
//           status: false,
//           message: "Invalid credentials, Please enter valid credentials.",
//         });
//         return;
//       }
//       const token = jwt.sign(
//         { id: user._id, role: user.role },
//         process.env.JWT_TOKEN_SECRET
//       );
//       res.cookie("jwt", token, {
//         maxAge: 86400 * 2000, //1000 = 1 day
//         httpOnly: false, // http only, prevents JavaScript cookie access
//         secure: false, // cookie must be sent over https / ssl
//         // sameSite: "none",
//       });
//       res.status(200).json({
//         status: true,
//         result: user,
//       });
//     } catch (err) {
//       res.status(500).json({
//         status: false,
//         message: "user Not found!",
//       });
//     }
//   },
// };

exports.signUpController = async(req,res)=>{
  // const validationError = validationResult(req);
  //   if (!validationError.isEmpty()) {
  //     res.status(400).json({
  //       status: false,
  //       errors: validationError.array(),
  //     });
  //     return;
  //   }
    const { email, password, confirmPassword, role, companyName, isAgree } =
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
