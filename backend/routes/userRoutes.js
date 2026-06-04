import express from "express";
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

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, admin, getUsers);

router.post("/", registerUser);

router.post("/login", authUser);

router.post("/logout", logoutUser); // Making it public

/* The below is an alternative way to define routes for the profile endpoint 
using express.Router.route() method, which allows chaining of HTTP methods 
for the same path.*/
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .get(protect, admin, getUserById)
  .delete(protect, admin, deleteUser)
  .put(protect, admin, updateUser);
/*...*/

export default router;
