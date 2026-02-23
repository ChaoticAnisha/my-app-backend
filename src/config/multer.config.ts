import multer from "multer";
import path from "path";
import fs from "fs";
import { ImageOptimizer } from "../utils/image-optimizer";

const uploadDir = path.join(process.cwd(), "uploads");

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("Upload directory created:", uploadDir);
} else {
  console.log("Upload directory:", uploadDir);
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "_" + uniqueSuffix + ext);
  },
});

// File filter for images only
const imageFilter = (req: any, file: any, cb: any) => {
  const allowedTypes = /jpeg|jpg|png|webp|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Only image files are allowed (jpeg, jpg, png, webp, gif)"));
  }
};

// Avatar upload configuration with auto-optimization
export const avatarUpload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: imageFilter,
});

// Middleware to optimize images after upload
export const optimizeUploadedImage = async (
  req: any,
  res: any,
  next: any
) => {
  try {
    if (req.file) {
      const filePath = req.file.path;
      console.log('Optimizing uploaded image...');
      
      // Optimize the image (compress and resize)
      await ImageOptimizer.optimizeImage(filePath, filePath, 1200, 85);
      
      console.log('Image optimization complete');
    }
    next();
  } catch (error) {
    console.error('❌ Image optimization error:', error);
    next(error);
  }
};

console.log("Multer configured successfully");