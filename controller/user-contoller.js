const User = require("../model/User");

// GET all users
const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "Users not found" });
  }
  return res.status(200).json({ users });
};

// SIGN UP user without password hashing
const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    console.log(err);
  }

  if (existingUser) {
    return res.status(400).json({ message: "User already exists!" });
  }

  const user = new User({
    name,
    email,
    password, // Plain text password (not secure)
    blogs: [],
  });

  try {
    await user.save();
    return res.status(201).json({ user });
  } catch (err) {
    console.log(err);
  }
};

// LOG IN user without bcrypt
const logIn = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    console.log(err);
  }

  if (!existingUser) {
    return res.status(404).json({ message: "User not found" });
  }

  if (password !== existingUser.password) {
    return res.status(400).json({ message: "Incorrect Password!" });
  }

  return res.status(200).json({ user: existingUser });
};

module.exports = { getAllUser, signUp, logIn };
