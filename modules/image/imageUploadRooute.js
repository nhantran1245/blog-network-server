const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public/upload');
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

const acceptType = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];

const fileFilter = (req, file, callback) => {
    if (acceptType.includes(file.mimetype)) {
        callback(null, true);
    } else {
        callback(null, false);
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

module.exports = (app) => {
    app.post("/api/upload", upload.single("uploadImg"), async (req, res) => {
       if (req.file) {
           res.status(201).json({
               path: req.file.path.slice(7, req.file.path.length)
           });
       } else {
           res.status(400).json({
               message: 'Upload fail'
           });
       }
    });
}
