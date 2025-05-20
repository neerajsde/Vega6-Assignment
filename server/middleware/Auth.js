import jwt from "jsonwebtoken";
import resSender from "../utils/resSender.js";
import User from "../models/user.js";
import dotenv from "dotenv";
import { redisClient } from "../config/redis.js";
dotenv.config();

export const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return resSender(res, 401, false, "Authorization token is missing");
    }

    // Check for blacklisted token & verify JWT
    const [isBlacklisted, payload] = await Promise.all([
      redisClient.get(`expToken:${token}`),
      new Promise((resolve, reject) =>
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) =>
          err ? reject(err) : resolve(decoded)
        )
      ),
    ]);

    if (isBlacklisted) {
      return resSender(
        res,
        401,
        false,
        "Token has been blacklisted. Please log in again."
      );
    }

    const userId = payload.id;

    // Ensure the token is the latest one issued to the user
    const storedToken = await redisClient.get(`user:${userId}:token`);
    if (storedToken !== token) {
      return resSender(
        res,
        401,
        false,
        "Invalid or expired session. Please log in again."
      );
    }

    // Try to get cached user data
    const [name, email, profile_img] = await redisClient.mGet([
      `user:${userId}:name`,
      `user:${userId}:email`,
      `user:${userId}:profile_img`,
    ]);

    if (name && email && profile_img) {
      req.user = { id: userId, name, email, profile_img };
      return next();
    }

    const user = await User.findById(userId);
    if (!user) {
      return resSender(res, 404, false, "User not found");
    }

    // Cache fetched user details
    await Promise.all([
      redisClient.setEx(`user:${userId}:name`, 300, String(user.name)),
      redisClient.setEx(`user:${userId}:email`, 300, String(user.email)),
      redisClient.setEx(
        `user:${userId}:profile_img`,
        300,
        String(user.profile_img) || ""
      ),
    ]);

    req.user = {
      id: userId,
      name: user.name,
      email: user.email,
      profile_img: user.profile_img,
    };

    next();
  } catch (err) {
    console.error("Authentication Error:", err);

    if (err.name === "TokenExpiredError") {
      return resSender(res, 401, false, "Token has expired!");
    }

    return resSender(res, 500, false, "Internal Server Error", {
      message: err.message,
    });
  }
};
