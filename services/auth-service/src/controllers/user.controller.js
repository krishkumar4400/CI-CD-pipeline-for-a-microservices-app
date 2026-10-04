import userModel from "../models/user.model.js";
import ApiError from "../utils/api-error.js";
import ApiResponse from "../utils/api-response.js";
import asyncHandler from "../utils/async-handler.js";

const registerUser = asyncHandler(async (req, res, next) => {
  const { fullName, email, phoneNumber, password } = req.body;

  const existingUser = await userModel.findOne({
    $or: [{ phoneNumber }, { email }],
  });

  if (existingUser) {
    throw new ApiError(409, "User already exists with email or phone");
  }

  const user = await userModel.create({
    fullName,
    email,
    phoneNumber,
    password,
  });

  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  const data = {
    message: "User has been registered successfully",
    success: true,
    status: "OK",
    user: {
      fullName: user.fullName,
      email: user.email,
      isEmailVerified: user.isEmailVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  };

  return res
    .status(201)
    .cookie("accessToken", accessToken)
    .cookie("refreshToken", refreshToken)
    .json(new ApiResponse(201, data, "User has been registered successfully"));
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({
    email,
  });

  if (!user) {
    throw new ApiError(401, "Incorrect email id or password");
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    throw new ApiError(401, "Incorrect email id or password");
  }

  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  const data = {
    message: "User has been logged in successfully",
    success: true,
    status: "OK",
    user: {
      fullName: user.fullName,
      email: user.email,
      isEmailVerified: user.isEmailVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken)
    .cookie("refreshToken", refreshToken)
    .json(new ApiResponse(200, data, "User has been logged in successfully"));
});

const logoutUser = asyncHandler(async (req, res, next) => {
  const user = await userModel.findByIdAndUpdate(req.userId, {
    $set: {
      refreshToken: "",
    },
  });

  return res
    .status(200)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json(new ApiResponse(200, {}, "User has been logged out successfully"));
});

const getCurrentUser = asyncHandler(async (req, res, next) => {
  const user = await userModel.findById(req.userId);

  if (!user) {
    throw new ApiError(400, "Incorrect user id");
  }

  const data = {
    message: "User has been fetched successfully",
    success: true,
    status: "OK",
    user: {
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      isEmailVerified: user.isEmailVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  };
  return res
    .status(200)
    .json(new ApiResponse(200, data, "User has been logged out successfully"));
});

export { registerUser, loginUser, logoutUser, getCurrentUser };
