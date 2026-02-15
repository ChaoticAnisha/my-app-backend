import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),

  filename: (req, file, cb) => {
    const userId = req.params.id;
    const ext = path.extname(file.originalname);
    cb(null, `${userId}${ext}`);
  },
});

const fileFilter: multer.Options["fileFilter"] = (_, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    cb(new Error("Only image files allowed"));
  } else {
    cb(null, true);
  }
};

export const uploadAvatar = multer({ storage, fileFilter });
