
const multer = require('multer');
const path = require('path');

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Uploads/');
    },
    filename: function (req, file, cb) {

        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
});
// File filter function
const fileFilter = (req, file, cb) => {

    if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'), false);
    }
};


const upload = multer({
    storage,
    fileFilter,
}).single('profileImage');

module.exports = upload;
