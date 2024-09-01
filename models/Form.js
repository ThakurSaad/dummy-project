const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const formSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },

    fields: [
      // array of dynamic fields
      {
        label: { type: String, required: true },
        fieldType: {
          type: String,
          required: true,
          enum: [
            "email",
            "number",
            "password",
            "url",
            "text",
            "date",
            "radio",
            "checkbox",
            "file",
          ],
        },
        options: [String], // Optional, for radio or checkbox fields
        required: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

const Form = mongoose.model("Form", formSchema);

module.exports = Form;
