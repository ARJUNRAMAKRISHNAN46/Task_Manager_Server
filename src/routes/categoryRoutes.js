const express = require("express");
const router = express.Router();
const {
  listCategory,
  addCategory,
  deleteCategory,
} = require("../controllers/category");

router.get("/list-categories", listCategory);
router.post("/add-categories", addCategory);
router.post("/delete-categories", deleteCategory);

module.exports = router;
