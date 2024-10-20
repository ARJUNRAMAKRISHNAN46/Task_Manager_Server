const Category = require("../models/category");

module.exports = {
  addCategory: async (req, res) => {
    try {
      const categoryData = req.body;
      const newCategory = await Category.create(categoryData);

      if (!newCategory) {
        res.status(400).json({
          success: false,
          data: null,
          message: "Category Added Successfully",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: newCategory,
        message: "Category Added Successfully",
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, data: null, message: "Internal Server Error" });
    }
  },

  listCategory: async (req, res) => {
    try {
      const userId = req.params.id;
      const categories = await Category.find({ user: userId });
      if (!categories) {
        res.status(400).json({
          success: false,
          data: null,
          message: "Category Listing Failed",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: categories,
        message: "Category Listed Successfully",
      });
      res.json(categories);
    } catch (error) {
      res
        .status(500)
        .json({ success: false, data: null, message: "Internal Server Error" });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const categoryId = req.params.id;
      const deleteCategory = await Category.findByIdAndDelete(categoryId);

      if (!deleteCategory) {
        res
          .status(400)
          .json({
            success: false,
            data: null,
            message: "Category Deletion Failed",
          });
      }

      res
        .status(200)
        .json({
          success: true,
          data: deleteCategory,
          message: "Category Deleted Successfully",
        });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, data: null, message: "Internal Server Error" });
    }
  },
};
