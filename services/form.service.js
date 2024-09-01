const Form = require("../models/Form");
const { ObjectId } = require("mongodb");

exports.createFormService = async (form) => {
  return await Form.create(form);
};

exports.findFormByIdService = async (formId) => {
  return await Form.findById(formId);
};

exports.addFieldService = async (formId, field) => {
  const updatedForm = await Form.findByIdAndUpdate(
    formId,
    {
      $push: { fields: field },
    },
    {
      new: true,
      fields: { _id: 0, fields: 1 },
    }
  );

  const fieldsCount = updatedForm.fields.length;

  return { updatedForm, fieldsCount };
};

exports.updateFieldService = async (formId, fieldId, updatedField) => {
  return await Form.updateOne(
    { _id: formId, "fields._id": fieldId },
    {
      $set: {
        "fields.$": updatedField,
      },
    }
  );
};

exports.deleteFieldService = async (formId, fieldId) => {
  return await Form.updateOne(
    { _id: formId, "fields._id": fieldId },
    {
      $pull: {
        fields: {
          _id: fieldId,
        },
      },
    }
  );
};

exports.serialUpdateFieldService = async (formId, fieldUpdates) => {
  const form = await this.findFormByIdService(formId);

  if (!form) {
    return "noForm";
  }

  // Loop through each field update and apply it
  fieldUpdates.forEach((update) => {
    const field = form.fields.id(update.id);

    if (field) {
      field.label = update.label !== undefined ? update.label : field.label;
      field.fieldType =
        update.fieldType !== undefined ? update.fieldType : field.fieldType;
      field.required =
        update.required !== undefined ? update.required : field.required;
    }
  });

  return await form.save();
};
