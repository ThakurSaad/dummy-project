const {
  createFormService,
  addFieldService,
  updateFieldService,
  deleteFieldService,
  serialUpdateFieldService,
} = require("../services/form.service");

exports.createForm = async (req, res) => {
  try {
    const form = await createFormService(req.body);

    res.status(200).json({
      status: "Success",
      message: "Form creation successful",
      data: form,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Form creation failed",
      error: error.message,
    });
  }
};

exports.addField = async (req, res) => {
  try {
    const formId = req.params.formId;

    const { updatedForm, fieldsCount } = await addFieldService(
      formId,
      req.body
    );

    res.status(200).json({
      status: "Success",
      message: "Field creation successful",
      data: { fieldsCount, fields: updatedForm.fields },
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Field creation failed",
      error: error.message,
    });
  }
};

exports.updateField = async (req, res) => {
  try {
    const { formId, fieldId } = req.params;

    const result = await updateFieldService(formId, fieldId, req.body);

    if (!result.matchedCount) {
      return res.status(404).json({
        status: "Not found",
        message:
          "Form or Field not found. Check formId and fieldId after updating once",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Field update successful",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Field update failed",
      error: error.message,
    });
  }
};

exports.deleteField = async (req, res) => {
  try {
    const { formId, fieldId } = req.params;

    const result = await deleteFieldService(formId, fieldId);

    if (!result.matchedCount) {
      return res.status(404).json({
        status: "Not found",
        message:
          "Form or Field not found. Check formId and fieldId after updating once",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Field delete successful",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Field delete failed",
      error: error.message,
    });
  }
};

exports.serialUpdateField = async (req, res) => {
  try {
    const { formId } = req.params;
    const arrOfFields = req.body;

    const result = await serialUpdateFieldService(formId, arrOfFields);

    if (result === "noForm") {
      return res.status(404).json({
        status: "Not found",
        message: "Form not found",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Field update successful",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Field update failed",
      error: error.message,
    });
  }
};
