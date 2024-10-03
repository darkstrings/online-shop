import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";

// remember these will all have /api/users at the beginning so it'll differentiate from productController routes

router.route("/").post(registerUser).get(protect, admin, getUsers); ///"api/users" (all users)
router.post("/logout", logoutUser); //"api/users/logout"
router.post("/auth", authUser); //"api/users/login"
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile); //"api/users/profile"
router.route("/:id").get(protect, admin, getUserById).delete(protect, admin, deleteUser).put(protect, admin, updateUser); //"api/users/:id etc"

export default router;
