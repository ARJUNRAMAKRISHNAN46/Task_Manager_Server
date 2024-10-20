const express = require("express");
const router = express.Router();
const { validatePatient, validateSignup } = require("../middleware/validators");
const {
  loginUser,
  logout,
  signUpUser,
  editUser,
  isExist,
} = require("../controllers/user");

router.post("/sign-in", loginUser);
router.post("/register", signUpUser);
router.get("/sign-out", logout);
router.get("/is-exists", isExist);
router.post("/edit-user/:id", editUser);

module.exports = router;
