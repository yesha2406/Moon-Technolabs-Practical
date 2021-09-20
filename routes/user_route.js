var express = require('express');
var multer = require('multer');
var router = express.Router();

var User = require("../controller/user_controller");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        let originalname = file.originalname.split(".");
        cb(null, originalname[0] + '-' + uniqueSuffix + '.' + originalname[1])
    }
})

const upload = multer({ storage: storage });

router.post('/signup', upload.single("image"), User.signup);
router.post('/signin', User.signin);

module.exports = router;
