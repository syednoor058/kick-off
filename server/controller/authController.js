import JWT from "jsonwebtoken";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";

export const registerController = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone, address } = req.body;
    //validations
    if (!firstName) {
      return res.status(500).send({ message: "First name is required" });
    }
    if (!lastName) {
      return res.status(500).send({ message: "Last name is required" });
    }
    if (!email) {
      return res.status(500).send({ message: "Email is required" });
    }
    if (!password) {
      return res.status(500).send({ message: "Password is required" });
    }
    if (!phone) {
      return res.status(500).send({ message: "Phone no is required" });
    }
    if (!address) {
      return res.status(500).send({ message: "Address is required" });
    }

    //check user
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already registered with this email.",
      });
    }

    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      firstName,
      lastName,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user: user,
    });
  } catch (error) {
    console.log(`Error register controller, ${error}`);

    res.status(501).send({
      success: false,
      message: "Error in registeration.",
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(200).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "User is not registered.",
      });
    }
    const matchPass = await comparePassword(password, user.password);
    if (!matchPass) {
      return res.status(200).send({
        success: false,
        message: "Invalid email or password.",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.firstName + " " + user.lastName,
        email: user.email,
        role: user.role,
      },
      token: token,
    });
  } catch (error) {
    console.log(`Error in login, ${error}`);
    res.status(501).send({
      success: false,
      message: "Error in login.",
      error,
    });
  }
};
