const { check } = require("express-validator");
const Joi = require("joi");

const loginBodyValidation = async (req, res, next) => {
  const body = req.body;
  try {
    const result = Joi.object({
      password: Joi.string().required(),
      email: Joi.string().required().email(),
    });
    const validation = result.validate(body);

    if (validation.error) {
      res
        .status(400)
        .json({ status: "fail", message: validation.error.details });
    } else {
      next();
    }
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
};
module.exports = loginBodyValidation;

