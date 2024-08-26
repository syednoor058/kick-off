import JWT from "jsonwebtoken";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";

export const registerController = async (req, res) => {
    try {
        const {name, email, password, phone, address} = req.body;
        //validations
    if (!name) {
        return res.send({ message: "Name is Required" });
      }
      if (!email) {
        return res.send({ message: "Email is Required" });
      }
      if (!password) {
        return res.send({ message: "Password is Required" });
      }
      if (!phone) {
        return res.send({ message: "Phone no is Required" });
      }
      if (!address) {
        return res.send({ message: "Address is Required" });
      }

      //check user
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }

    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
        name,
        email,
        phone,
        address,
        password: hashedPassword,
      }).save();

      res.status(201).send({
        success: true,
        message: "User Register Successfully",
        user,
      });


    } catch (error) {
        console.log(`Error register controller, ${error}`);
        
        res.status(501).send({
            success: false,
            message: "Error in registeration."

        })
    }
};

export const loginController = async (req, res) => {
    try {
        const {email, password} = req.body;
         //validation
    if (!email || !password) {
        return res.status(404).send({
          success: false,
          message: "Invalid email or password",
        });
      }
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).send({
            message: "User is not registered."
        })
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
          name: user.name,
          email: user.email
        },
        token,
      });
    } catch (error) {
        console.log(`Error in login, ${error}`);
        res.status(501).send({
            success: false,
            message: "Error in login.",
            error,
        })
    }
};