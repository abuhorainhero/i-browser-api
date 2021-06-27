const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/specialRevenueSite');
    },
    filename: (req, file, cb) => {
        const extension = file.mimetype.split("/")[1];
        cb(null, file.fieldname + "-" + Date.now() + "." + extension);
    },
});

const uploadIcon = multer({ storage: storage });

module.exports = { uploadIcon }