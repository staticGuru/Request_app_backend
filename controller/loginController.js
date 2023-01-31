const bcrypt = require("bcryptjs");
// const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const userSchema = require("../models/userSchema");

exports.loginController = async(req,res) => {
    // const validationError = validationResult(req);
    // if (!validationError.isEmpty()) {
    //   res.status(400).json({
    //     status: false,
    //     errors: validationError.array(),
    //   });
    //   return;
    // }
    const { email, password } = req.body;

    try {
      const user = await userSchema.findOne({ email: email });
      if (!user) {
        res.status(401).json({
          status: false,
          message: "Invalid email or password, Please enter valid credentials.",
        });
        return;
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if ( !isPasswordValid) {
        res.status(400).json({
          status: false,
          message: "Invalid email or password, Please enter valid credentials.",
        });
        return;
      }
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_TOKEN_SECRET
      );
      res.cookie("jwt", token, {
        maxAge: 86400 * 1000, //1000 = 1 day
        httpOnly: false, // http only, prevents JavaScript cookie access
        secure: false, // cookie must be sent over https / ssl
        // sameSite: "none",
      });
      res.status(200).json({
        status: true,
        result: user,
      });
    } catch (err) {
      res.status(500).json({
        status: false,
        message: err.message,
      });
    }
}