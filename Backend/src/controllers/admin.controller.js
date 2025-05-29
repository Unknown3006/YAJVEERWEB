import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Admin } from "../models/admin.model.js";
import jwt from "jsonwebtoken";

const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "Admin@123";

export const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
        throw new ApiError(401, "Invalid admin credentials");
    }

    // Find or create admin document
    let admin = await Admin.findOne({ email });
    
    if (!admin) {
        admin = await Admin.create({
            email,
            password: "hashed_password", // In production, use proper password hashing
        });
    }

    // Update login history
    admin.lastLogin = new Date();
    admin.loginHistory.push({
        timestamp: new Date(),
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"]
    });
    await admin.save();

    const accessToken = jwt.sign(
        { email, role: "admin" },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );

    const refreshToken = jwt.sign(
        { email, role: "admin" },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "None"
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    accessToken,
                    refreshToken,
                    lastLogin: admin.lastLogin,
                },
                "Admin logged in successfully"
            )
        );
});

export const logoutAdmin = asyncHandler(async (req, res) => {
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "Admin logged out successfully"))
});
