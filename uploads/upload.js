const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../images')); // ทำให้ path ถูกไม่ว่าไฟล์รันจากไหน
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix+file.originalname);
  }
});

exports.upload = multer({ storage: storage }).array('imagename'); 
