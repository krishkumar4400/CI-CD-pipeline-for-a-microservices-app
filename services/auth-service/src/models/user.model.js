import mongoose from "mongoose";
import { AvailableUserRoles, UserRolesEnum } from "../utils/constants.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "FullName is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    unique: true,
    index: true,
    lowercase: true,
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone Number is required"],
    trim: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
    select: false,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  refreshToken: {
    type: String,
  },
  role: {
    type: String,
    enum: AvailableUserRoles,
    default: UserRolesEnum.BUYER,
  },
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      userId: this._id,
    },
    env.accessTokenSecret,
    {
      expiresIn: "5m",
    },
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      userId: this._id,
    },
    env.refreshTokenSecret,
    {
      expiresIn: "7d",
    },
  );
};

const userModel = mongoose.models.User || mongoose.model("User", userSchema);
export default userModel;
