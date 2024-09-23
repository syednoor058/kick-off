import orderModel from "../models/orderModel.js";

export const placeOrderController = async (req, res) => {
  try {
    const {
      product,
      email,
      region,
      firstName,
      lastName,
      address,
      appartment,
      city,
      postalCode,
      phoneNumber,
      payment,
      sendAccNum,
      transactionId,
      user,
    } = req.body;

    if (!Array.isArray(product)) {
      return res.status(404).send({ success: false, message: "Product is undefined!" });
    }

    if (product?.length < 1) {
      return res.status(404).send({success:false, message:"No product in cart!"});
    }
    if (!email) {
      return res.status(404).send({success:false, message:"Email is required!"});
    }
    if (!region) {
      return res.status(404).send({success:false, message:"Region is required!"});
    }
    if (!firstName) {
      return res.status(404).send({success:false, message:"First name is required!"});
    }
    if (!lastName) {
      return res.status(404).send({success:false, message:"Last name is required!"});
    }
    if (!address) {
      return res.status(404).send({success:false, message:"Address is required!"});
    }
    if (!city) {
      return res.status(404).send({success:false, message:"City is required!"});
    }
    if (!phoneNumber) {
      return res.status(404).send({success:false, message:"Phone number is required!"});
    }
    if (!sendAccNum) {
      return res.status(404).send({success:false, message:"Sender account number is required!"});
    }
    if (!transactionId) {
      return res.status(404).send({success:false, message:"Transaction ID is required!"});
    }
    if (!user) {
      return res.status(404).send({success:false, message:"Login first!"});
    }

    const order = await new orderModel({
      product: product,
      buyer: {
        email: email,
        region: region,
        firstName: firstName,
        lastName: lastName,
        address: address,
        appartment: appartment,
        city: city,
        postalCode: postalCode,
        phoneNumber: phoneNumber,
        payment: payment,
        sendAccNum: sendAccNum,
        transactionId: transactionId,
      },
      user: user,
    });

    await order.save();

    res.status(201).send({
      success: true,
      message: "Order is placed!",
      order: order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({success:false, message:"Error while placing order!"});
  }
};
