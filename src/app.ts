import express from "express";
import cors from "cors";
import path from "path";
import userRoutes from "./routes/user.routes";
import productRoutes from "./routes/product.routes";
import categoryRoutes from "./routes/category.routes";
import { errorHandler } from "./errors/errorHandler";

const app = express();

// CORS - Allow frontend to access backend
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

// Serve uploaded files
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

app.use(errorHandler);

export default app;