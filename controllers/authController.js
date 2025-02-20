import userModel from "../models/userModel.js";
import { hashPassword } from "../helper/authHelper.js";
import jwt from "jsonwebtoken";
import { comparePassword } from "../helper/authHelper.js";
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    //validation
    if (!name || !email || !password || !phone || !address || !answer) {
      return res.status(400).send({
        success: false,
        message: "Please fill all the fields",
      });
    }
    //check  user
    const user = await userModel.findOne({ email });

    //if user exists
    if (user) {
      return res.status(400).send({
        success: true,
        message: "User already exists please login your account",
      });
    }

    //register the user
    const hashedPassword = await hashPassword(password);
    //save the user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      answer,
    });
    await newUser.save();

    res.status(201).send({
      success: true,
      message: "User registered successfully",
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Register a user",
    });
  }
};

//POST login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please fill all the fields",
      });
    }

    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "invalid user or password",
      });
    }

    //check password
    const match = await comparePassword(password, user.password);
    if (!match) {
      console.log(password);

      return res.status(200).send({
        success: false,
        message: "Invalid password",
      });
    }

    //token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
    });
  }
};

//forgot password
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;

    if (!email || !answer || !newPassword) {
      res.status(201).send({
        success: false,
        message: "Please provide all the fields",
      });
    }

    //check user
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "Wrong email or answer",
      });
    }

    const hashed = await hashPassword(newPassword);

    await userModel.findByIdAndUpdate(user._id, { password: hashed });

    res.status(201).send({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

//test contorller || GET
export const testController = async (req, res) => {
  res.status(200).send({
    success: true,
    message: "Test controller",
  });
};
