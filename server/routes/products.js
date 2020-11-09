const express = require("express");
const router = express.Router();
const { Product } = require("../models/Product");
const multer = require("multer");

//=================================
//             Product
//=================================
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, "uploads/");
        },
        filename(req, file, cb) {
            cb(null, `${Date.now()}_${file.originalname}`);
        },
    }),
});
router.post("/image", upload.single("file"), (req, res) => {
    // 가져온 이미지를 저장

    res.json({
        success: true,
        filePath: res.req.file.path,
        fileName: res.req.file.filename,
    });
});
router.post("/", (req, res) => {
    // 가져온 이미지를 저장
    const product = new Product(req.body);

    product.save((err) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true,
        });
    });
});

router.post("/product", (req, res) => {
    Product.find()
        .populate("writer")
        .exec((err, productInfo) => {
            if (err)
                return res.status(400).json({
                    success: false,
                    err,
                });
            return res.status(200).json({
                productSuccess: true,
                productInfo,
            });
        });
});

module.exports = router;
