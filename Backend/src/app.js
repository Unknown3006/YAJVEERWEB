import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import ServerlessHttp from "serverless-http";

const app = express();

// CORS middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Your React app's URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body parsers
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Static files and cookies
app.use(express.static("public"));
app.use(cookieParser());

// Import routes
import userRouter from "./routes/user.routes.js";
import productrouter from "./routes/product.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productrouter);

app.use((err, req, res, next) => {
  const statusCode = err.statuscode || 500;

  return res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

app.get("/api/v1", (req, res) => {
  res.send("Welcome to CKS_dev");
});

app.get("/", (req, res) => {
  res.send("Hello from Yajveer Backend!");
});

export { app };
export const handler = ServerlessHttp(app);



