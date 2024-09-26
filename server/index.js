import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import connectDB from "./config/db.js";
import { isAdmin, requireSignIn } from "./middlewares/authMiddleware.js";
import authRoute from "./routes/authRoute.js";
import bannerRoute from "./routes/bannerRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import orderRoute from "./routes/orderRoute.js";
import productRoute from "./routes/productRoute.js";

dotenv.config();
const app = express();
//Database connection
connectDB();

//Middlewares
app.use(cors({ origin: process.env.ALLOWED_ORIGIN, credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

// All routes
app.use("/api", productRoute);
app.use("/api", categoryRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api", orderRoute);
app.use("/api", bannerRoute)
app.get("/api", requireSignIn, isAdmin, (req, res) => {
  res.send({
    message: "Welcome to Kick-off backend.",
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});
