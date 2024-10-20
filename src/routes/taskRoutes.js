const express = require("express");
const router = express.Router();

router.get("/list-tasks/:id", listTask);
router.post("/add-task/:id", addTask);
router.put("/edit-task/:id", editTask);
router.delete("/delete-task/:id", deleteTask);

module.exports = router;
