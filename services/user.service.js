const User = require("../models/User");

exports.registerService = async (user) => {
  return await User.create(user);
};

exports.findUserByEmailService = async (email) => {
  return await User.findOne({ email });
};

exports.updatePasswordService = async (email, password, newPassword) => {
  const user = await this.findUserByEmailService(email);

  const isPasswordValid = user.password === password;
  if (!isPasswordValid) {
    return "invalidPassword";
  }

  const doesPasswordMatchWithPrev = user.password === newPassword;
  if (doesPasswordMatchWithPrev) {
    return "passwordMatchWithPrev";
  }

  return (result = await User.updateOne(
    { email: email },
    { $set: { password: newPassword } }
  ));
};

exports.updateProfileService = async (email, data) => {
  return await User.updateOne({ email }, data);
};
