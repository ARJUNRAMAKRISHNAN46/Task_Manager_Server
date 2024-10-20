const { body } = require("express-validator");

const validatePatient = [
  body("name.first").trim().notEmpty().withMessage("First name is required"),
  body("name.last").trim().notEmpty().withMessage("Last name is required"),
  body("dateOfBirth")
    .isISO8601()
    .withMessage("Valid date of birth is required"),
  body("gender")
    .isIn(["male", "female", "other"])
    .withMessage("Invalid gender"),
];

const validateSignup = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("Full name must be between 2 and 50 characters"),
    
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),
    
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage("Password must contain at least one uppercase letter, one lowercase letter, and one number"),
];

const validateAuthRequest = [
  body("patientId").notEmpty().withMessage("Patient ID is required"),
  body("treatmentType").notEmpty().withMessage("Treatment type is required"),
  body("diagnosisCode").notEmpty().withMessage("Diagnosis code is required"),
  body("serviceDate").isISO8601().withMessage("Valid service date is required"),
  body("providerId").notEmpty().withMessage("Provider ID is required"),
];

module.exports = { validatePatient, validateAuthRequest, validateSignup };
