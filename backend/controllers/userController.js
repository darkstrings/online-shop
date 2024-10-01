import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";

/////////////////////////////////////////////// AUTHENTICATE USER
// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  res.send("auth user");
});

//////////////////////////////////////////// REGISTER NEW USER
// @desc    Register user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  res.send("Register user");
});

///////////////////////////////////////////////// LOG OUT USER
// @desc    Log out user / clear cookie
// @route   POST /api/users/logout
// @access  private
const logoutUser = asyncHandler(async (req, res) => {
  res.send("Log out user");
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

///////////////////////////////////////////////// LOG OUT USER
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
