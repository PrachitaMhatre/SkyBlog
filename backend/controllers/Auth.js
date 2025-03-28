import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";

// Register User
const Register = async (req, res) => {
  try {
    const { FullName, email, password } = req.body;

    //  Ensure file is uploaded before accessing filename
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Profile image is required",
      });
    }

    const imagePath = req.file.filename;
    console.log("Uploaded Image Path:", imagePath);

    // Check if user already exists
    const existUser = await UserModel.findOne({ email });
    if (existUser) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists. Please Login",
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      FullName,
      email,
      password: hashedPassword,
      profile: imagePath,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Login User
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const FindUser = await UserModel.findOne({ email });
    if (!FindUser) {
      return res.status(404).json({
        success: false,
        message: "No user found. Please register.",
      });
    }

    // Compare Password with Hashed Password
    const comparePassword = await bcrypt.compare(password, FindUser.password);
    if (!comparePassword) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }

    // Create Token
    const token = jwt.sign({ userId: FindUser._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days in milliseconds
    });

    return res.status(200).json({
      success: true,
      message: "Login successful!",
      user: FindUser,
      token,
    });
  } catch (error) {
    console.error("Error during login", error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error :(" });
  }
};

// Logout User
const Logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res
      .status(200)
      .json({ success: true, message: "Logout successful!" });
  } catch (error) {
    console.error("Error logging out:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error :(" });
  }
};

// Update Profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const { FullName, oldpassword, newpassword } = req.body;

    // Find the User
    const ExistUser = await UserModel.findById(userId);
    if (!ExistUser) {
      return res
        .status(404)
        .json({ success: false, message: "Account not found :(" });
    }

    // Validate Old Password If Provided
    if (oldpassword) {
      const comparePassword = await bcrypt.compare(
        oldpassword,
        ExistUser.password
      );
      if (!comparePassword) {
        return res
          .status(401)
          .json({ success: false, message: "Old password is incorrect :(" });
      }
    }

    // Update Full Name
    if (FullName) {
      ExistUser.FullName = FullName;
    }

    // Update Password If Both Old & New Passwords Are Provided
    if (oldpassword && newpassword) {
      const hashedPassword = await bcrypt.hash(newpassword, 10);
      ExistUser.password = hashedPassword;
    } else if (oldpassword && !newpassword) {
      return res.status(400).json({
        success: false,
        message: "New password is required when old password is provided.",
      });
    }

    //  Handle Profile Image Update
    if (req.file && req.file.filename) {
      //  Delete Old Image
      if (ExistUser.profile) {
        const oldImagePath = path.join("public/images", ExistUser.profile);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      // Update with New Image Path
      ExistUser.profile = req.file.filename;
    }

    //  Save Updated User
    await ExistUser.save();

    //  Dynamically Generate Full Profile URL
    const imageUrl = `${req.protocol}://${req.get("host")}/images/${
      ExistUser.profile
    }`;

    res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user: {
        _id: ExistUser._id,
        FullName: ExistUser.FullName,
        email: ExistUser.email,
        profile: imageUrl, //
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error :(" });
  }
};

export { Register, Login, Logout, updateProfile };
