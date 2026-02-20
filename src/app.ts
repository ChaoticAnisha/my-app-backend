import express from "express";
import cors from "cors";
import path from "path";
import userRoutes from "./routes/user.routes";
import productRoutes from "./routes/product.routes";
import categoryRoutes from "./routes/category.routes";
import orderRoutes from "./routes/order.routes";
import { errorHandler } from "./errors/errorHandler";
import authRoutes from "./routes/auth.routes";
import adminUserRoutes from "./routes/admin-user.routes";

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin/users", adminUserRoutes); 
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);

app.use(errorHandler);

export default app;