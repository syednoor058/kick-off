import productsModel from "../models/productsModel.js";

// create product
export const createProductController = async (req, res) => {
  try {
    let { name, productType, desc, size, price, category, photo } = req.fields;
    // let { photo } = req.files;

    // Check if size is a comma-separated string (if sent like "s,l,xl")
    if (typeof size === "string" && size.includes(",")) {
      size = size.split(",");
    } else {
      size = [size];
    }

    if (typeof photo === "string" && photo.includes(",")) {
      photo = photo.split(",");
    } else {
      photo = [photo];
    }

    //Validation
    if (!name) {
      return res.status(500).send({ message: "Product name is required!" });
    }
    if (!desc) {
      return res
        .status(500)
        .send({ message: "Product description is required!" });
    }
    if (!size) {
      return res.status(500).send({ message: "Product size is required!" });
    }
    if (!price) {
      return res.status(500).send({ message: "Product price is required!" });
    }
    if (!category) {
      return res.status(500).send({ message: "Product category is required!" });
    }
    if (photo.length < 1) {
      return res.status(500).send({ message: "Product photo is required" });
    }
    // photo.map((pic) => {
    //   if (pic.size > 1000000) {
    //     return res
    //       .status(501)
    //       .send({ message: "File size is more than 1 MB!" });
    //   }
    // }
    // );

    const existProduct = await productsModel.findOne({ name });
    if (existProduct) {
      return res.status(200).send({
        success: false,
        message: "Product with same name is already existed!",
      });
    }

    const product = await new productsModel({
      name,
      productType,
      desc,
      size,
      price,
      category,
      photo,
    });
    // product.photo = photo.map((pic) => {
    //   return {
    //     data: fs.readFileSync(pic.path),
    //     contentType: pic.type,
    // }
    // });

    await product.save();

    res.status(201).send({
      success: true,
      message: "Product is added!",
      product: product,
    });
  } catch (err) {
    console.log(`Error occured creating product, ${err}`);
    res.status(500).send({
      success: false,
      message: "Error occured while listing the product.",
    });
  }
};

// get product
export const getProductController = async (req, res) => {
  try {
    const products = await productsModel
      .find({})
      .populate("category", "-photo")
      .sort({ createdAt: -1 });
    res.status(201).send({
      success: true,
      message: "All products!",
      products: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting products!",
    });
  }
};

// get single product
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productsModel
      .findById(req.params.id)
      .select("-photo")
      .populate("category", "-photo");
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "The product not found!",
      });
    }
    res.status(201).send({
      success: true,
      message: "Product is found!",
      product: product,
    });
  } catch (error) {
    console.log(error);
    res.status(501).send({
      success: false,
      message: "Error while getting the product!",
    });
  }
};

// get product photos
export const getProductPhotoController = async (req, res) => {
  try {
    const product = await productsModel.findById(req.params.id).select("photo");
    if (product.photo.length > 0) {
      const photo = product.photo.map((pic) => {
        if (pic.data) {
          return {
            contentType: pic.contentType,
            data: pic.data.toString("base64"),
          };
        }
        return res.send(photo);
      });

      res.status(201).send({
        success: true,
        message: "Product images get successfull!",
        photo,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(501).send({
      success: false,
      message: "Error while getting product images!",
    });
  }
};

// delete product

export const deleteProductController = async (req, res) => {
  try {
    await productsModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "The product has been deleted!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Can not delete the product!",
    });
  }
};

// update product
export const updateProductController = async (req, res) => {
  try {
    let { name, productType, desc, size, price, category, photo, isAvailable } = req.fields;
    // let { photo } = req.files;

    // Ensure that 'size' and 'photo' is an array, even if only one file is uploaded
    if (typeof size === "string" && size.includes(",")) {
      size = size.split(",");
    } else {
      size = [size];
    }

    if (typeof photo === "string" && photo.includes(",")) {
      photo = photo.split(",");
    } else {
      photo = [photo];
    }

    //Validation
    if (!name) {
      return res.status(500).send({ message: "Product name is required!" });
    }
    if (!desc) {
      return res
        .status(500)
        .send({ message: "Product description is required!" });
    }
    if (!size) {
      return res.status(500).send({ message: "Product size is required!" });
    }
    if (!price) {
      return res.status(500).send({ message: "Product price is required!" });
    }
    if (!category) {
      return res.status(500).send({ message: "Product category is required!" });
    }
    if (photo.length < 1) {
      return res.status(500).send({ message: "Product photo is required" });
    }

    const product = await productsModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        productType,
        desc,
        size,
        price,
        category,
        photo,
        isAvailable,
      },
      { new: true }
    );
    // product.photo = photo.map((pic) => {
    //   return {
    //     data: fs.readFileSync(pic.path),
    //     contentType: pic.type,
    //   };
    // });

    await product.save();

    res.status(201).send({
      success: true,
      message: "Product is updated successfully!",
      product: product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error occured while updating the product.",
    });
  }
};
