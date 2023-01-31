const Joi = require('joi')

const signUpBodyValidation = async(req,res,next) => {
  const body = req.body
  try{
    const result = Joi.object({
    password: Joi
      .string()
      .min(8)
      .max(20).required(),
    role: Joi.string().required().valid("Admin","User"),
    email: Joi.string().required().email(),
      // .regex(/^[\w!.%+\-]+@[\w\-]+(?:\.[\w\-]+)+$/)
    confirmPassword: Joi.string().required(),
    companyName: Joi.string().required().min(3).max(30),
    isAgree: Joi.boolean().required().valid(true),
    //userName: Joi.string().required().min(4).max(20)
    })
    const validation = result.validate(body)

    if(validation.error){
      res.status(401).json({status: "fail", message: validation.error.details})
    }else{
      next()
    }
  }catch(err){
    res.status(500).json({status: "fail", message: err.message})
  }
}
module.exports = signUpBodyValidation