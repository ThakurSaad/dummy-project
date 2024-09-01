const express = require("express");
const router = express.Router();

const formController = require("../controllers/form.controller");

router.post("/create-form", formController.createForm);
router.patch("/add-field/:formId", formController.addField);
router.patch("/update-field/:formId/:fieldId", formController.updateField);
// router.patch("/delete-field/:formId/:fieldId", formController.deleteField);
router.patch("/serial-update-field/:formId", formController.serialUpdateField);

module.exports = router;
