const fs = require('fs');
const uploadDir = 'UploadImg';

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
// middleware/upload.js
const multer = require('multer');
const path = require('path');

// Storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'UploadImg/'); // folder to store files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
