import fs from 'fs';
import categoryModel from "../models/categoryModel.js";

// create category
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.fields;
    const { photo } = req.files;

    // Validations
    if (!name) {
      return res.status(500).send({ message: "Category name is required" });
    }
    if (!photo) {
      return res.status(500).send({ message: "Category photo is required" });
    }
    if (photo && photo.size > 1000000) {
      return res.status(501).send({ message: "File size is more than 1 MB!" });
    }

    const existCategory = await categoryModel.findOne({ name });
    if (existCategory) {
      return res.status(200).send({
        success: false,
        message: "Category is already existed!",
      });
    }
    const slug = name.split(" ").join("-");
    const category = await new categoryModel({
      ...req.fields,
      slug: slug,
    });
    category.photo.data = fs.readFileSync(photo.path);
    category.photo.contentType = photo.type;
    await category.save();

    res.status(201).send({
      success: true,
      message: "Category is added!",
      category: category,
    });
  } catch (error) {
    console.log(error.message);
    res.status(404).send({
      success: false,
      message: "Error occured creating category!",
    });
  }
};


// Get all categories
export const getAllCategoriesController = async (req, res) => {
  try {
    const categories = await categoryModel.find({}).select("-photo");
    res.status(200).send({
      success: true,
      message: "All categories are fetched!",
      categories: categories,
    });
  } catch (error) {
    console.log(error.message);
    res.status(404).send({
      success: false,
      message: "Error occurred while fetching categories!",
    });
  }
};

// Get a single category by id
export const getCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findById(req.params.id).select("-photo");
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found!",
      });
    }
    res.status(200).send({
      success: true,
      category: category,
    });
  } catch (error) {
    console.log(error.message);
    res.status(404).send({
      success: false,
      message: "Error occurred while fetching category!",
    });
  }
};

// Get category photo
export const getCategoryPhotoController = async (req, res) => {
  try {
    const category = await categoryModel.findById(req.params.id).select("photo");
    if (category.photo.data) {
      res.set("Content-Type", category.photo.contentType);
      return res.send(category.photo.data);
    }
  } catch (error) {
    console.log(error.message);
    res.status(404).send({
      success: false,
      message: "Error occurred while fetching category photo!",
    });
  }
};