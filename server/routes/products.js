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
    const limit = req.body.limit ? parseInt(req.body.limit) : 20;
    const skip = req.body.skip ? parseInt(req.body.skip) : 0;

    Product.find()
        .populate("writer")
        .skip(skip)
        .limit(limit)
        .exec((err, productInfo) => {
            if (err)
                return res.status(400).json({
                    success: false,
                    err,
                });
            return res.status(200).json({
                productSuccess: true,
                productInfo,
                postSize: productInfo.length,
            });
        });
});

module.exports = router;
