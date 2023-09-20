const router = require("express").Router();
const pool = require("../db");

router.post("/createclinic", async (req, res) => {
  try {
    const {
      organizationId,
      clinicName,
      clinicShortName,
      dentalSoftwareName,
      address,
      city,
      state,
      zipCode,
      currentUser,
    } = req.body;
    const response = await pool.query(
      `INSERT INTO business.clinic_info (org_unique_id,clinic_name,clinic_short_name,dental_software,clinic_address,clinic_city,clinic_state,clinic_zip_code,clinic_status,created_by) VALUES ('${organizationId}','${clinicName}','${clinicShortName}','${dentalSoftwareName}','${address}','${city}','${state}','${zipCode}','ACTIVE','${currentUser?.id}') RETURNING clinic_id`
    );
    res.json(response);
  } catch (err) {
    console.log(err);
  }
});

router.get("/softwarelist", async (req, res) => {
  try {
    const response = await pool.query(
      `SELECT * FROM reference.software_reference`
    );
    res.json(response);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
