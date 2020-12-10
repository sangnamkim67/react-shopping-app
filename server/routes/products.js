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
                productInfo: productInfo,
                postSize: productInfo.length,
            });
        });
});

router.get("/detail", (req, res) => {
    let type = req.query.type;
    let ids = req.query.id;

    if (type === "array") {
        let productIds = req.query.id.split(",");
        ids = [];
        ids = productIds.map((item) => {
            return item;
        });
    }

    Product.find({ _id: { $in: ids } })
        .populate("writer")
        .exec((err, product) => {
            if (err) return res.status(400).send(err);
            return res.status(200).send(product);
        });
});

module.exports = router;
