import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(201).send({
        success: false,
        message: "Please provide category name",
      });
    }

    const isCategoryExist = await categoryModel.findOne({ name });

    if (isCategoryExist) {
      return res.status(201).send({
        success: false,
        message: "Category already exist",
      });
    }

    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();

    res.status(201).send({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create category",
      error,
    });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update category",
      error,
    });
  }
};

export const getAllCategoryController = async (req, res) => {
  try {
    const allCategory = await categoryModel.find({});

    res.status(200).send({
      success: true,
      message: "All categories list",
      allCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get all category",
      error,
    });
  }
};

export const getSingleCategoryController = async (req, res) => {
  try {
    const singleCategory = await categoryModel.findOne({
      slug: req.params.slug,
    });

    res.status(200).send({
      success: true,
      message: "Get single category successfully",
      singleCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get single category",
      error,
    });
  }
};

export const deleteCategoryController = async (req, res) => {
  try {
    const deleteCategory = await categoryModel.findByIdAndDelete(req.params.id);

    res.status(200).send({
      success: true,
      message: "Category deleted successfully",
      deleteCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete category",
      error,
    });
  }
};
