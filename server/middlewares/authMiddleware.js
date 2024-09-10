import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    const authToken = req.headers.authorization
    if (!authToken) {
      return res.status(401).send({
        success: false,
        message: "Authorization header is missing",
      });
    }
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({success: false,
      message: "Authentication failed!"
    })
  }
};

//admin acceess
export const isAdmin = async (req, res, next) => {
  try {
    // Check if user data is present
    if (!req.user) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access: User not found",
      });
    }
    
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};