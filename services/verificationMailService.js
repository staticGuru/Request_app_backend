var nodemailer = require("nodemailer");

exports.VerificationMailService = async (req, res) => {
  let { email, pin } = req.body;
  console.log(email,"=====================>",pin)
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: "developer.eapp@gmail.com",
        pass:"fszpwbyowqsyvrnx",
      },
    });

    const mailOptions = {
      from: "developer.eapp@gmail.com",
      to: email,
      subject: "Sending Email using Node.js",
      text: pin,
    };

    return transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(401).json({ status: false, message: error });
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).json({ status: true, result: "Verification pin sended successfully!!!" });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, message: err.message });
  }
};
