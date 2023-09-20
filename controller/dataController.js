const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const data = require("../models/dataSchema");

exports.dataController = async (req, res) => {
  try {
    const { customerid, fullname, description } = req.body;
    
    const newCreatedData = await data.create({
      customerid,
      fullname,
      description,
    });
    const newData = await newCreatedData.save();

    res.status(200).json({ status: true, result: "data Created" });
 
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, message: err.message });
  }
};

exports.findOneController = async (req, res) => {
     try {
          console.log(req.body)
       const { customerid } = req.body;
       const selectedData = await data.findOne({ customerid: customerid });
     
   if(!selectedData) res.status(404).json({status:selectedData})
       res.status(200).json({ status: true, result: selectedData });
     } catch (err) {
       console.log(err);
       res.status(500).json({ status: false, message: err.message });
     }
   };
   