import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  getOrders,
  updateOrderToDelivered,
} from "../controllers/orderController.js";

const router = express.Router();

// remember these will all have /api/users at the beginning so it'll differentiate from productController routes

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders); ///"api/orders" (all logged in user's orders)
router.route("/mine").get(protect, getMyOrders); //"api/orders/myorders"
router.route("/:id").get(protect, getOrderById); //"api/orders/:id etc"
router.route("/:id/pay").put(protect, updateOrderToPaid); //"api/orders/:id/pay"
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered); //"api/orders/:id/deliver"

export default router;
