import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import cors from "cors";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";

//config
dotenv.config();

//DATABASE CONNECT
connectDB();

const app = express();

//middlewares
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(morgan("dev"));

//all routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to my e-commerce API</h1>");
});

//Port
const PORT = process.env.PORT;

//listen
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.bgCyan.white);
});
