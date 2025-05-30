import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import connectDB from "./db/index.js";
import { app } from "./app.js";

connectDB()
  .then(() => {
    const PORT = process.env.PORT || 8000;  // Change this from 2590 to 8000
    app.listen(PORT, () => {
      console.log(`⚙️ Server is running at http://localhost:${PORT}`);
      console.log('Press CTRL + C to stop the server');
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });


export default app;
