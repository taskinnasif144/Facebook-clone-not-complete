import userModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  let user;
  try {
    user = await userModel.findOne({ email: email });
  } catch (e) {
    console.error(e);
  }
  if (!user) {
    return res.json({ message: "User not Found" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, user.password);
  if (isPasswordCorrect) {
    const token = jwt.sign({ id: user._id }, "secret");
    res.json({ token: token, userID: user._id, user: user });
  } else {
    res.json({ message: "User not Authorized, check password again" });
  }
};

export const createUser = async (req, res) => {
  const { name, email, password, date, gender } = req.body;

  let existingUser;

  try {
    existingUser = await userModel.findOne({ email: email });
  } catch (err) {
    console.error(err);
  }

  if (existingUser) {
    return res.status(400).json({ message: "User already exist" });
  }
  const saltedPass = bcrypt.hashSync(password, 10);
  const newUser = new userModel({
    name: name,
    email: email,
    password: saltedPass,
    date: date,
    gender: gender,
    dp: "",
    cover: "",
    ownPosts: [],
    savedPosts: [],
    friends: [],
    friendRequests: [],
    bio: "",
  });

  try {
    await newUser.save();
    res.send(newUser);
  } catch (err) {
    console.error(err);
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  let user;
  try {
    user = await userModel.deleteOne({ _id: id });
    res.json({ message: "User has been removed successfully" });
  } catch (error) {
    res.json({ message: "Coudnt remove User" });
    console.log(error);
  }
};

export const userDpSet = async (req, res) => {
  const { userID, imgUrl } = req.body;

  try {
    const user = await userModel.findOne({ _id: userID });
    if (user) {
      user.dp = imgUrl;
      res.json({ message: "1" });
    } else {
      res.json({ message: "0" });
    }
    user.save();
  } catch (error) {
    res.json({ message: error });
  }
};

export const userCoverSet = async (req, res) => {
  const { userID, imgUrl } = req.body;

  try {
    const user = await userModel.findOne({ _id: userID });
    if (user) {
      user.cover = imgUrl;
      res.json({ message: "1" });
    } else {
      res.json({ message: "0" });
    }
    user.save();
  } catch (error) {
    res.json({ message: error });
  }
};

export const getUserInfo = async (req, res) => {
  const { uid } = req.params;

  try {
    const user = await userModel.findOne({ _id: uid });
    if (user) {
      user.ownPosts.reverse();
      res.json(user);
    } else {
      res.json({ message: "0" });
    }
  } catch (error) {}
};

export const userBioSet = async (req, res) => {
  const { userID, bio } = req.body;

  try {
    const user = await userModel.findOne({ _id: userID });
    if (user) {
      user.bio = bio;
      user.save();
      res.json({ message: "Bio Has been Updated" });
    } else {
      res.json({ message: "Bio failed to Updated" });
    }
  } catch (error) {
    console.log(error);
  }
};
