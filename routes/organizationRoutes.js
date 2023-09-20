const router = require("express").Router();
const pool = require("../db");

router.post("/createorganization", async (req, res) => {
  try {
    const {
      organizationName,
      organizationShortName,
      address,
      city,
      state,
      zipCode,
      numberOfClinics,
    } = req.body;
    const response = await pool.query(
      `INSERT INTO business.org_info (org_name,org_short_name,org_address,org_city,org_state,org_zip_code,org_clinic_count,org_status) VALUES ('${organizationName}','${organizationShortName}','${address}','${city}','${state}','${zipCode}',${numberOfClinics},'ACTIVE') RETURNING org_id`
    );
      res.json(response);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
