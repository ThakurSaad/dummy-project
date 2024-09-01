const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },

    email: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Email is required"],
      validate: [validator.isEmail, "Provide a valid email"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      validate: {
        validator: (value) =>
          validator.isStrongPassword(value, {
            minLength: 6,
            minLowercase: 3,
            minNumbers: 1,
            minUppercase: 1,
            minSymbols: 1,
          }),
        message:
          "Password {VALUE} is not strong enough. It should have at least 6 characters, including 3 lowercase letters, 1 uppercase letter, 1 number, and 1 symbol.",
      },
    },

    phoneNo: {
      type: String,
      unique: true,
      validate: {
        validator: (value) => validator.isMobilePhone(value, "any"), // You can specify a locale or use 'any'
        message: "Provide a valid phone number",
      },
    },

    dateOfBirth: {
      type: Date,
      validate: {
        validator: (value) => {
          return value <= new Date();
        },
        message: "Date of birth cannot be in the future",
      },
    },

    location: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
