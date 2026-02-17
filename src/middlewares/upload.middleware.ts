import multer from "multer";
import path from "path";
import fs from "fs";

// ✅ Create uploads directory if it doesn't exist
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Create products upload directory
const productUploadDir = path.join(process.cwd(), "uploads", "products");
if (!fs.existsSync(productUploadDir)) {
  fs.mkdirSync(productUploadDir, { recursive: true });
}

// ✅ Avatar Storage
const avatarStorage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const userId = req.params.id;
    const ext = path.extname(file.originalname);
    cb(null, `avatar_${userId}${ext}`);
  },
});

// ✅ Product Image Storage
const productStorage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, productUploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `product_${uniqueSuffix}${ext}`);
  },
});

// ✅ File filter
const fileFilter: multer.Options["fileFilter"] = (_, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    cb(new Error("Only image files allowed"));
  } else {
    cb(null, true);
  }
};

// ✅ Export both upload handlers
export const uploadAvatar = multer({ 
  storage: avatarStorage, 
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

export const uploadProductImage = multer({ 
  storage: productStorage, 
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});