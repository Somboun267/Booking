const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../Profileimages')); // ทำให้ path ถูกไม่ว่าไฟล์รันจากไหน
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix+file.originalname);
  }
});

exports.uploadProfile = multer({ storage: storage }).single('imageProfile'); 
