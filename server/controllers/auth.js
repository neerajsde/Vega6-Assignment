import User from "../models/user.js";
import resSender from "../utils/resSender.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { redisClient } from "../config/redis.js";
import { validateEmail, validatePassword } from "../utils/validation.js";
import { imageUploader } from "../utils/fileUploader.js";
import dotenv from "dotenv";
dotenv.config();

// login
export async function loginHandler(req, res) {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return resSender(res, 400, false, "Email and password are required");
    }

    if (!validateEmail(email)) {
      return resSender(res, 400, false, "Invaild email");
    }

    // Fetch user from the database
    const user = await User.findOne({ email: email });
    if (!user) {
      return resSender(res, 404, false, "user not found");
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return resSender(res, 401, false, "wrong password");
    }

    // Generate JWT token
    const payload = { id: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });

    await redisClient.setEx(`user:${user._id}:token`, 864000, String(token));

    return resSender(res, 200, true, "Login successful", {
      user_id: user._id,
      token,
    });
  } catch (err) {
    console.error("Login Error:", err.message);
    return resSender(res, 500, false, err.message);
  }
}

// logout
export async function logOutHandler(req, res) {
  try {
    if (!req.user || !req.user.id) {
      return resSender(res, 400, false, "Invalid request, user not found");
    }

    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return resSender(res, 401, false, "Token is missing");
    }

    // Decode token to get expiration time
    const decoded = jwt.decode(token);
    if (!decoded || !decoded.exp) {
      return resSender(res, 400, false, "Invalid token");
    }

    // 1. Immediately remove the stored token from Redis (Recommended)
    redisClient.del(`authToken:${req.user.id}`);

    // 2. Optional: Blacklist the token with an expiry (alternative method)
    const expTime = decoded.exp - Math.floor(Date.now() / 1000);
    if (expTime > 0) {
      redisClient.set(`expToken:${token}`, "blacklisted", "EX", expTime);
    }

    return resSender(res, 200, true, "Logout successful");
  } catch (err) {
    console.error("Logout Error:", err.message);
    return resSender(res, 500, false, "An error occurred during logout");
  }
}

// Function to register a user
export async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    const imgFile = req.files?.profile_img;

    if (!name || !email || !password) {
      return resSender(
        res,
        400,
        false,
        "All fields are required and email must be valid"
      );
    }

    if (!imgFile) {
      return resSender(res, 400, false, "Profile image are required");
    }

    if (!validateEmail(email)) {
      return resSender(res, 400, false, "Invaild email");
    }

    const checkPass = validatePassword(password);
    if (checkPass !== true) {
      return resSender(res, 404, false, checkPass);
    }

    // Fetch user
    const userExits = await User.findOne({ email: email });
    if (userExits) {
      return resSender(res, 401, false, "User already exists");
    }

    // Hash password and generate API key
    const hashedPassword = await bcrypt.hash(password, 12);

    // upload profile_img
    const uploadResult = await imageUploader("profile_images", imgFile, {
      width: 300,
      height: 300,
      quality: 80,
    });

    if (!uploadResult.flag) {
      return resSender(res, 400, false, uploadResult.message);
    }

    let user = await User.create({
      name,
      email,
      password: hashedPassword,
      profile_img: uploadResult.url || "",
    });

    if (user && user._id) {
      return resSender(res, 201, true, "User created successfully");
    } else {
      return resSender(res, 500, false, "User creation failed.");
    }
  } catch (err) {
    console.error("❌ Error registering user:", err.message);
    return resSender(res, 500, false, err.message);
  }
}
