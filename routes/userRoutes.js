const router = require("express").Router();
const checkAuth = require("../middlewares/checkAuth");
const loginBodyValidation = require("../middlewares/loginBodyValidation");
const signUpBodyValidation = require("../middlewares/signUpBodyValidation");
const signUpController = require("../controller/signUpController");
const loginController = require("../controller/loginController");
const dataController = require("../controller/dataController");
const pool = require("../db");
const verifcationPinValidation = require("../middlewares/verifcationPinValidation");
const VerificationMailService = require("../services/verificationMailService");


//New user creation original
router.post("/signup",signUpBodyValidation, async (req, res) => {
  try {
    const { firstName, lastName, middleName, email, password, orgId } =
      req.body;
    const getOrganization = await pool.query(
      `SELECT id FROM business.org_info WHERE org_id=${orgId}`
    );
    if (getOrganization.rows.length) {
      let getOrganizationUniqueId = getOrganization.rows?.[0].id;
      const createdUser = await pool.query(
        `INSERT INTO user_info.user_table (org_unique_id,first_name,middle_name,last_name,user_email,login_pwd,login_id) VALUES ('${getOrganizationUniqueId}','${firstName}','${middleName}','${lastName}','${email}','${password}','${email}') RETURNING id`
      );
      res.status(200).send(createdUser);
    } else {
      res.status(404).send("Invalid organization ID!!!");
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const getUser = await pool.query(
      `SELECT * FROM user_info.user_table WHERE user_email='${email}'`
    );
    if (getUser.rows.length) {
      let getUserPassword = getUser.rows?.[0]?.login_pwd;
      if (getUserPassword === password) {
        let { org_unique_id, id, user_id, first_name } = getUser.rows?.[0];
        const getOrg = await pool.query(
          `SELECT * FROM business.org_info WHERE id='${org_unique_id}'`
        );

        const getOrganization = getOrg.rows?.[0];
        res.status(200).json({
          organization: getOrganization,
          id,
          userID: user_id,
          name: first_name,
        });
      } else {
        res.status(404).send("Ooops, wrong password!!!");
      }
    } else {
      res.status(404).send("Ooops, user data not found!!!");
    }
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
