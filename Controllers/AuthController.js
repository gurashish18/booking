import User from "../Models/UserModel.js";
import bcrypt from "bcryptjs";
import { createError } from "../Utils/Error.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res, next) => {
  try {
    var salt = bcrypt.genSaltSync(10);
    var hashedpassword = bcrypt.hashSync(req.body.password, salt);
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedpassword,
    });
    await user.save();
    res.status(200).json("User has been created successfully!!");
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(createError(404, "No user found"));
    }
    const passwordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordValid) {
      return next(createError(400, "Wrong Email or Password"));
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );
    res
      .cookie("Access_Token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(user);
  } catch (error) {
    next(error);
  }
};
