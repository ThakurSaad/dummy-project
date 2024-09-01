const {
  registerService,
  findUserByEmailService,
  updatePasswordService,
  updateProfileService,
} = require("../services/user.service");
const sendEmail = require("../utils/sendEmail");

exports.register = async (req, res) => {
  try {
    const user = await registerService(req.body);

    res.status(200).json({
      status: "Success",
      message: "Registration successful",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Registration not successful",
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if ((!email, !password)) {
      return res.status(401).send({
        status: "Unauthorized",
        error: "Please provide credentials",
      });
    }

    const user = await findUserByEmailService(email);

    if (!user) {
      return res.status(404).json({
        status: "Not found",
        error: "No user found. Please create an account",
      });
    }

    const isPasswordValid = user.password === password;

    if (!isPasswordValid) {
      return res.status(401).json({
        status: "Unauthorized",
        error: "Password is not correct",
      });
    }

    const { password: pass, ...others } = user.toObject();

    res.status(200).json({
      status: "Success",
      message: "Login successful",
      data: others,
    });
  } catch (error) {
    console.log("error");
    res.status(400).json({
      status: "Fail",
      message: "Login not successful",
      error: error.message,
    });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { email, password, newPassword } = req.body;

    if ((!email, !password)) {
      return res.status(401).send({
        status: "Unauthorized",
        error: "Please provide credentials",
      });
    } else if (!newPassword) {
      return res.status(400).send({
        status: "Bad request",
        error: "Please provide new password",
      });
    }

    const result = await updatePasswordService(email, password, newPassword);

    if (result === "invalidPassword") {
      return res.status(401).json({
        status: "Unauthorized",
        error: "Password is not correct",
      });
    } else if (result === "passwordMatchWithPrev") {
      return res.status(400).json({
        status: "Bad request",
        error: "New password must not match with previous one",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Update password successful",
      data: result,
    });
  } catch (error) {
    console.log("error");
    res.status(400).json({
      status: "Fail",
      message: "Update password not successful",
      error: error.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const email = req.params.email;

    const result = await updateProfileService(email, req.body);

    if (!result.matchedCount) {
      return res.status(404).json({
        status: "Not found",
        message: "No user found",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Profile update successful",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Profile update successful",
      error: error.message,
    });
  }
};

exports.logout = async (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.clearCookie("connect.sid"); // Name of the session cookie
      return res.status(200).json({ message: "Logged out successfully" });
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Logout not successful",
      error: error.message,
    });
  }
};

exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const subject = "Password Reset Request";
    const text = `You have requested a password reset. Please follow the instructions to reset your password.`;

    await sendEmail(email, subject, text);


    res.status(200).json({
      status: "Success",
      message: "Password Reset Email Sent",
      // data: result,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      status: "Fail",
      message: "Password Reset Email Not Sent",
      error: error.message,
    });
  }
};
