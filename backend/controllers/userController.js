import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken.js";

/////////////////////////////////////////////// AUTHENTICATE USER
// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  // findOne is a promise (in mongoose) looking for a match for email in the database. It returns a single document (the first it finds so make the search unique) that matches the specified query criteria. Since both variables match, it doesn't need to be email: email.

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("invalid email or password");
  }
});

//////////////////////////////////////////// REGISTER NEW USER
// @desc    Register user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

///////////////////////////////////////////////// LOG OUT USER
// @desc    Log out user / clear cookie
// @route   POST /api/users/logout
// @access  private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ status: "Successfully logged out" });
});

///////////////////////////////////////////////// GET USER PROFILE
// @desc    Get user profile
// @route   GET /api/users/profile
// @access  private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send("User profile");
});

///////////////////////////////////////////////// UPDATE USER PROFILE (SELF)
// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("Update user profile");
});

///////////////////////////////////////////////// GET ALL USERS (ADMIN LEVEL)
// @desc    Get all users
// @route   GET /api/users
// @access  private/admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("Get all users (admin)");
});

///////////////////////////////////////////////// GET USER BY ID (ADMIN LEVEL)
// @desc    Get user by id
// @route   GET /api/users/:id
// @access  private/admin
const getUserById = asyncHandler(async (req, res) => {
  res.send("Get user by id (admin)");
});

///////////////////////////////////////////////// DELETE USER (ADMIN LEVEL)
// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  private/admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send("Delete user (admin)");
});

///////////////////////////////////////////////// UPDATE USER (ADMIN LEVEL)
// @desc    Update user
// @route   PUT /api/users/profile
// @access  private
const updateUser = asyncHandler(async (req, res) => {
  res.send("Update user (admin)");
});

export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, getUsers, getUserById, deleteUser, updateUser };
