import multer from "multer";
import path from "path";
//multer.diskStorage() creates a storage space for storing files.
const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
            cb(null, __basedir + "/assets/uploads/");
        } else {
            cb({ message: "This file is not an image file" }, false);
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const videoStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype === "video/mp4") {
            cb(null, path.join(__dirname, "../files"));
        } else {
            cb({ message: "This file is not in video format." }, false);
        }
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const imageUpload = multer({ storage: imageStorage });
const videoUpload = multer({ storage: videoStorage });
export {
    imageUpload,
    videoUpload
};