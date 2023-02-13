const Joi = require('joi')

const verifcationPinValidation = async(req,res,next) => {
  const body = req.body
  try{
    const result = Joi.object({
    email: Joi.string().required().email(),
    pin:Joi.string().required(),
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
module.exports = verifcationPinValidation