import bannerModel from "../models/bannerModel.js";

export const uploadCarausolController = async (req, res) => {
  try {
    let { url } = req.body;

    const carausols = await new bannerModel({ url });
    await carausols.save();

    res.status(200).send({ success: true, message: "Carausol uploaded!" });
  } catch (error) {
    console.log(error);
    resizeBy
      .status(500)
      .send({ success: false, message: "Error uploading carausol!" });
  }
};

export const getCarausolController = async (req, res) => {
  try {
    const carausols = await bannerModel.find({});
    const emptyCarausol = [];

    if (carausols) {
      res
        .status(200)
        .send({ success: true, message: "Carausols fetched!", carausols: carausols });
    } else {
      res
        .status(200)
        .send({ success: true, message: "Carausols fetched!", carausols: emptyCarausol });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error fetching carausols!" });
  }
};

export const updateCarausolController = async (req, res) => {
  try {
    let { carausolId, url } = req.body;
    const carausol = await bannerModel.findByIdAndUpdate(
      carausolId,
      { url: url },
      { new: true }
    );
    await carausol.save();
    res
      .status(201)
      .send({ success: true, message: "Carausol updated!", carausol });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error updating carausols!" });
  }
};
