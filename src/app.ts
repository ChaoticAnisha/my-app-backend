import express from "express";
import cors from "cors";
import path from "path";
import userRoutes from "./routes/user.routes";
import { errorHandler } from "./errors/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/users", userRoutes);
app.use(errorHandler);

export default app;
