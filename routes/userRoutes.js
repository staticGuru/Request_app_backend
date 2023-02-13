const router = require("express").Router();
const checkAuth = require("../middlewares/checkAuth");
const loginBodyValidation = require("../middlewares/loginBodyValidation");
const signUpBodyValidation = require("../middlewares/signUpBodyValidation")
const signUpController = require("../controller/signUpController");
const loginController = require("../controller/loginController");

const verifcationPinValidation = require("../middlewares/verifcationPinValidation");
const VerificationMailService = require("../services/verificationMailService");


router.post("/login", loginBodyValidation, (req,res)=>{
  loginController.loginController(req,res)
});

router.post("/signup", signUpBodyValidation, (req,res)=>{
  signUpController.signUpController(req,res)
});

router.get("/check", (req, res) => {

  res.json({ msg: " successfully" });
});

router.get("/auth", checkAuth, (req, res) => {
  res.json({ msg: "checkAuth passed successfully" });
});

// router.post("/createRequest", requestBodyValidation, (req,res)=>{
//   requestController.requestController(req,res)
// });

//utils
router.post("/verificationpin",verifcationPinValidation, (req,res)=>{
  
  VerificationMailService.VerificationMailService(req,res);
});

module.exports = router;
