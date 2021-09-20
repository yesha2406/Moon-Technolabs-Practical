var express = require('express');
var multer = require('multer');
var router = express.Router();

const Product = require("../controller/product_controller");
const Auth = require("../middleware/auth");

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

const upload = multer({ storage: storage })

// /* Create Product Page. */
// router.get('/create', function (req, res, next) {
//     res.render('product/product');
// });

router.post('/create', Auth.isSignedIn, upload.single("image"), Product.createProduct);
router.get('/read', Auth.isSignedIn, Product.getAllProducs);
router.put('/update/:product_id', Auth.isSignedIn, upload.single("image"), Product.updateproduct);
router.delete('/delete/:product_id', Auth.isSignedIn, Product.deleteproduct);

module.exports = router;
