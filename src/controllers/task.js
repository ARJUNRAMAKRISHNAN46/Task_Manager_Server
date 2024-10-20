const express = require("express");
const router = express.Router();
const Tasks = require("../models/task");

module.exports = {
  addTask: async (req, res) => {
    try {
      const task = new Tasks({
        ...req.body,
        user: req.user._id,
      });
      await task.save();
      res.status(200).json({
        success: true,
        data: task,
        message: "Task Created Successfully",
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, data: null, message: "Internal Server Error" });
    }
  },

  listTask: async (req, res) => {
    try {
      const match = {};
      if (req.query.status) {
        match.status = req.query.status;
      }
      if (req.query.category) {
        match.category = req.query.category;
      }

      const tasks = await Tasks.find({
        user: req.user._id,
        ...match,
      }).populate("category");
      res.json(tasks);
    } catch (error) {
      res
        .status(500)
        .json({ success: false, data: null, message: "Internal Server Error" });
    }
  },

  editTask: async (req, res) => {
    try {
      const task = await Tasks.findOneAndUpdate(
        { _id: req.params.id, user: req.user._id },
        req.body,
        { new: true }
      );
      if (!task) {
        res
          .status(400)
          .json({ success: false, data: null, message: "Edit Task Failed" });
        return;
      }
      res.json(task);
    } catch (error) {
      res
        .status(500)
        .json({ success: false, data: null, message: "Internal Server Error" });
    }
  },

  deleteTask: async (req, res) => {
    try {
      const taskId = req.params.id;
      const deleteTask = await Tasks.findByIdAndDelete(taskId);

      if (!deleteTask) {
        res.status(400).json({
          success: false,
          data: null,
          message: "Task Deletion Failed",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: null,
        message: "Task Deleted Successfully",
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, data: null, message: "Internal Server Error" });
    }
  },
};
