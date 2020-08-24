const express = require('express');
const multer = require('multer');
const router = express.Router();
const productControlleer = require('../controllers/products');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.' + file.originalname);
  },
});
const fileFilter = function (req, file, cb) {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024,
  },
  fileFilter: fileFilter,
});
let cpUpload = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'relatedImage', maxCount: 3 },
]);

router.get('/', productControlleer.index);
router.get('/:id', productControlleer.detail);
router.post('/', cpUpload, productControlleer.post_product);

module.exports = router;
