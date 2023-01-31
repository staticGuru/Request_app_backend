const router = require("express").Router();
const checkAuth = require("../middlewares/checkAuth");
const loginBodyValidation = require("../middlewares/loginBodyValidation");
const signUpBodyValidation = require("../middlewares/signUpBodyValidation")
const signUpController = require("../controller/signUpController");
const loginController = require("../controller/loginController");


router.post("/login", loginBodyValidation, (req,res)=>{
  console.log("calleddd------>",req)
  loginController.loginController(req,res)
});

router.post("/signup", signUpBodyValidation, (req,res)=>{
  console.log("calleddd---32423--->",req)
  signUpController.signUpController(req,res)
});

router.get("/auth", checkAuth, (req, res) => {
  res.json({ msg: "checkAuth passed successfully" });
});

// router.post("/createRequest", requestBodyValidation, (req,res)=>{
//   requestController.requestController(req,res)
// });

module.exports = router;
