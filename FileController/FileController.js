const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/images");
    },
    filename: function (req, file, cb) {
        const extension = file.mimetype.split("/")[1];
        cb(null, file.fieldname + "-" + Date.now() + "." + extension);
    },
});

const upload = multer({ storage: storage });

module.exports = { upload }