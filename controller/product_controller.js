var generator = require('generate-password');
var Product = require("../schemas/product_schema");

exports.createProduct = async (req, res) => {
    var sku = generator.generate({
        length: 10,
        numbers: true,
        uppercase: true,
        lowercase: false
    });

    let url = req.headers.host + "/public/uploads/" + req.file.filename;

    let product = new Product({
        name: req.body.name,
        price: req.body.price,
        image: url,
        sku: sku,
        category_id: req.body.category_id
    });

    let data = await product.save();

    return res.status(200).json({
        status: "Success",
        statusCode: 200,
        message: "Product added successfully",
        data: data
    })
}

exports.getAllProducs = async (req, res) => {
    let filter = {};
    if (req.query) {
        filter.name = { "$regex": req.query.select, "$options": "i" };
    }

    let products = await Product.find(filter).populate("category");

    if (!products) {
        return res.status(400).json({
            status: "Error",
            statusCode: 400,
            message: "products are not available"
        })
    }

    return res.status(200).json({
        status: "Success",
        statusCode: 200,
        message: "All the products",
        data: products
    });
}

exports.updateproduct = async (req, res) => {
    let id = req.params.product_id;

    let product = await Product.findById({ _id: id });

    if (!product) {
        return res.status(400).json({
            status: "Error",
            statusCode: 400,
            message: "product is not available"
        })
    }

    let url;
    if (req.file) {
        url = req.headers.host + "/public/uploads/" + req.file.filename;
    } else {
        url = product.url;
    }

    let data = {
        name: req.body.name,
        price: req.body.price,
        image: url,
        sku: product.sku,
        category_id: req.body.category_id
    }

    await Product.findByIdAndUpdate({ _id: id }, data);

    return res.status(200).json({
        status: "Success",
        statusCode: 200,
        message: "Product update successfully",
    });
}

exports.deleteproduct = async (req, res) => {
    let id = req.params.product_id;

    let product = await Product.findByIdAndDelete({ _id: id });

    if (!product) {
        return res.status(400).json({
            status: "Error",
            statusCode: 400,
            message: "product is not available"
        })
    }

    return res.status(200).json({
        status: "Success",
        statusCode: 200,
        message: "Product delete successfully",
    });
}