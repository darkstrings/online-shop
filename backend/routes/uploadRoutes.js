import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  // destination means the folder it's going to be stored in. cb is the callback function. The first argument is the error, the second is the destination
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

function fileFilter(req, file, cb) {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Images only!"), false);
  }
}

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");

router.post("/", (req, res) => {
  uploadSingleImage(req, res, function (err) {
    if (err) {
      res.status(400).send({ message: err.message });
    }

    res.status(200).send({
      message: "Image uploaded successfully",
      image: `/${req.file.path}`,
    });
  });
});

export default router;

/**

path.extname(file.originalname): extracts the file extension from the original file name using the path.extname() function.
.toLowerCase(): converts the extracted file extension to lowercase to make the comparison case-insensitive.
filetypes.test(...): tests whether the extracted file extension matches one of the image file types using the filetypes regular expression.
The result of the test is assigned to the extname variable, which will be true if the file extension matches, or false otherwise.

.test is a method of the RegExp object in JavaScript. It's used to test whether a string matches the regular expression. In this case, it's being called on the filetypes regular expression to check if the file extension or MIME type matches one of the specified image types.

 */
