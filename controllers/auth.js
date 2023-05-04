import JWT from "jsonwebtoken";
import User from "../models/User.js";
import ExpressError from "../helpers/expressError.js";

export const createUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username) {
    return res.send({ error: "Name is Required" });
  }
  if (!email) {
    return res.send({ message: "Email is Required" });
  }
  if (!password) {
    return res.send({ message: "Password is Required" });
  }
  //check user
  const exisitingUser = await User.findOne({ username });
  //exisiting user
  if (exisitingUser) {
    return res.status(200).send({
      success: false,
      message: "Already Register please login",
    });
  }
  const user = new User({ username, email, password });
  const resp = await user.save();
  const data = {
    user: { id: user._id },
  };
  const authToken = JWT.sign(data, process.env.JWT_SECRET, { expiresIn: 600 });
  res.status(201).json({ success: true, user: resp, authToken });
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const foundUser = await User.findAndValidate(username, password);
  if (foundUser) {
    const data = {
      user: { id: foundUser._id },
    };
    const authToken = JWT.sign(data, process.env.JWT_SECRET, {
      expiresIn: 600,
    });
    res.status(201).json({ success: true, authToken });
  } else {
    throw new ExpressError("invalid credentials !!", 400);
  }
};

export const getUser = async (req, res) => {
  const userID = req.user.id;
  const user = await User.findById(userID).select("-password");
  res.status(201).json(user);
};
