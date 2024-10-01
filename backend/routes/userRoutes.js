import express from "express";

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

router.route("/").post(registerUser).get(getUsers); ///"api/users"
router.post("/logout", logoutUser); //"api/users/logout"
router.post("/login", authUser); //"api/users/login"
router.route("/profile").get(getUserProfile).put(updateUserProfile); //"api/users/profile"
router.route("/:id").get(getUserById).delete(deleteUser).put(updateUser); //"api/users/:id etc"

export default router;
