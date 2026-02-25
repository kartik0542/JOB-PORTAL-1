import multer from "multer";

const storage = multer.memoryStorage();
export const singleUpload = multer({ storage }).single("file"); // Must match file name from Signup.jsx (line 138)
