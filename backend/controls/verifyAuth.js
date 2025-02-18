const nodeMailer = require("nodemailer");
const otpCache = {};

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}
function sendOTP(email, otp) {
  const mailInfo = {
    from: "caber9988@gmail.com",
    to: email,
    subject: "OTP for verification",
    text: `Your OTP for verification is ${otp}`,
  };

  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: "caber9988@gmail.com",
      pass: "faak ywkf tgfx incd",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  transporter.sendMail(mailInfo, (err, info) => {
    if (err) {
      console.log("error occurred" + err);
    } else {
      console.log("OTP send successfully" + info);
    }
  });
}

const reqOTP = async (req, res) => {
  const email = req.body.email;
  const otp = generateOTP();
  otpCache[email] = otp;

  sendOTP(email, otp);
  res.status(200).json({
    message: "OTP sent successfully",
  });
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  if (!otpCache.hasOwnProperty(email)) {
    return res.status(400).json({
      message: "Email not found",
    });
  }

  if (otpCache[email] === otp) {
    delete otpCache[email];
    return res.status(200).json({
      message: "OTP verified successfully",
    });
  } else {
    return res.status(400).json({
      message: "Invalid OTP",
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { email, password } = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.updateOne({ email }, { password: hashedPassword });

    return res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (err) {
    console.log(err);
  }
};

console.log(generateOTP());
module.exports = { reqOTP, verifyOTP, changePassword };
