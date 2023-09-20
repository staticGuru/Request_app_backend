const Joi = require("joi");

const signUpBodyValidation = async (req, res, next) => {
  const body = req.body;
  try {
    const result = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      middleName: Joi.string(),
      email: Joi.string().required().email(),
      password: Joi.string().min(8).max(20).required(),
      reEnterPassword: Joi.string().required(),
      orgId: Joi.number().required(),
    });
    const validation = result.validate(body);

    if (validation.error) {
      res
        .status(401)
        .json({ status: "fail", message: validation.error.details });
    } else {
      next();
    }
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
};
module.exports = signUpBodyValidation;
