import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import ServerlessHttp from "serverless-http";

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "https://yajveer.vercel.app"  
];
// !origin || allowedOrigins.includes(origin) ||
// CORS middleware
app.use(
  cors({
    // origin: function (origin, callback) {
    //   if (process.env.CORS_ORIGIN) {
    //     callback(null, true);
    //   } else {
    //     callback(new Error("CORS not allowed for this origin"));
    //   }
    // },
    origin: "*",
    credentials: true, // only if you're using cookies
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

app.get("/api/v1", (req, res) => {
    res.send("Welcome to CKS_dev");
});

app.get("/", (req, res) => {
    res.send("Hello from Yajveer Backend!");
});

export { app };
export const handler = ServerlessHttp(app);



