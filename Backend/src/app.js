import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import ServerlessHttp from "serverless-http";

const app = express();

// Define allowed origins based on environment
const allowedOrigins = [
    "http://localhost:5173",    // Admin frontend
    "http://localhost:3000",    // Frontend
    "https://yajveer-admin.vercel.app", // Production Admin URL
    "https://yajveer.vercel.app"       // Production Frontend URL
];

// CORS configuration
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl requests)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsers
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Static files and cookies
app.use(express.static("public"));
app.use(cookieParser());

// Import routes
import userRouter from "./routes/user.routes.js";
import productrouter from "./routes/product.routes.js"

app.use("/api/v1/users", userRouter); 
app.use("/api/v1/products",productrouter);



app.use((err, req, res, next) => {
  const statusCode = err.statuscode || 500;

  return res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});


// Root route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Yajveer Backend API"
    });
});

// API route
app.get("/api/v1", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Yajveer API - Version 1"
    });
});

export { app };
export const handler = ServerlessHttp(app);



