import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
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
    res.status(200).json({
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
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

///////////////////////////////////////////////// UPDATE USER PROFILE (SELF)
// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

///////////////////////////////////////////////// GET ALL USERS (ADMIN LEVEL)
// @desc    Get all users
// @route   GET /api/users
// @access  private/admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

///////////////////////////////////////////////// GET USER BY ID (ADMIN LEVEL)
// @desc    Get user by id
// @route   GET /api/users/:id
// @access  private/admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

///////////////////////////////////////////////// DELETE USER (ADMIN LEVEL)
// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  private/admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Users of admin status cannot be deleted");
    }
    await User.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "User deleted successfully" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

///////////////////////////////////////////////// UPDATE USER (ADMIN LEVEL)
// @desc    Update user
// @route   PUT /api/users/profile
// @access  private
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    // change the name to the name in the request body or keep it as is if there isn't one.

    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();
    //  saving the updated user document to the database using Mongoose.

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, getUsers, getUserById, deleteUser, updateUser };
