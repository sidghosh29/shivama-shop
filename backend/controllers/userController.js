import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken.js";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
  //   expiresIn: "15m", // Short-lived
  // });

  // // Set JWT in HTTP-only cookie
  // res.cookie("jwt", token, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production", // Use secure cookies in production
  //   sameSite: "Strict", // CSRF protection
  //   maxAge: 15 * 60 * 1000, // 15 minutes
  // });

  generateToken(res, user._id);

  return res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
  // Here you would typically compare the provided password with the hashed password
  // stored in the database
  // For example: const isMatch = await bcrypt.compare(password, user.password);

  // If the password matches, generate a JWT token and send it back to the client
  // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  // res.json({ token });
});

// @desc    Register user
// @route   POST /api/users
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
  // Registration logic goes here
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(409); // Conflict
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);

    return res.status(201).json({
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

// @desc    Logout user / Clear cookie
// @route   POST /api/users/logout
// @access  Private

const logoutUser = asyncHandler(async (req, res) => {
  // Logout logic goes here
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0), // Set cookie to expire in the past
  });

  //   res.clearCookie("jwt", {httpOnly: true});

  res.status(200).json({ message: "Logged out successfully" });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private

const getUserProfile = asyncHandler(async (req, res) => {
  // Get user profile logic goes here
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json(req.user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private

const updateUserProfile = asyncHandler(async (req, res) => {
  // Update user profile logic goes here
  const user = await User.findById(req.user._id);
  if (user) {
    if (req.body.name && user.name !== req.body.name) {
      user.name = req.body.name;
    }
    if (req.body.email && user.email !== req.body.email) {
      user.email = req.body.email;
    }
    if (req.body.password && !(await user.matchPassword(req.body.password))) {
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

// @desc    Get users
// @route   GET /api/users
// @access  Private/Admin

const getUsers = asyncHandler(async (req, res) => {
  // Get users logic goes here
  res.send("Get Users");
});

// @desc    Get user
// @route   GET /api/users/:id
// @access  Private/Admin

const getUserById = asyncHandler(async (req, res) => {
  // Get user logic goes here
  res.send("Get User by id");
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin

const deleteUser = asyncHandler(async (req, res) => {
  // Delete user logic goes here
  res.send("Delete User");
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin

const updateUser = asyncHandler(async (req, res) => {
  // Update User logic goes here
  res.send("Update User");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
};
