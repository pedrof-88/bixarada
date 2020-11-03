const multer = require('multer');
const path = require('path');
const crypto = require('crypto');


module.exports = {
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),

  storage: multer.diskStorage({

    destination: (req, file, callback) => {
      callback(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'));
    },

    filename: (req, file, callback) => {
        crypto.randomBytes(16, (err, hash) => {
        if (err) callback(err);
        const key = hash.toString('hex');
        const ext = path.extname(file.originalname);
        callback(null, `${Date.now()}_${key}${ext}`);
      });
    },
  }),
  limits: {
    filesize: 8 * 1024 * 1024,
  },
  filefilter: (req, file, callback) => {
    const allowedMimes =[
      'image/jpg'
    ];
    if(allowedMimes.include(file.mimetype)) {
      callback(null, true);
    }else {
      callback(new Error('Invalid file type.'));
    }
  }
}