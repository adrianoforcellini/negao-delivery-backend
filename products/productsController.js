const router = require("express").Router();
const Products = require("../models/productsModel");
require("dotenv").config();

router.get("/", async (req, res) => {
    try {
        const products = await Products.find();
        res.status(200).json({ products });
    } catch (erro) {
        res.status(500).json({ error });
    }
});

router.post(`/${process.env.POST_ROUTE}`, async (req, res) => {
    const { name, description, price, img_url } = req.body;
    const product = { name, description, price, img_url }

    try {
        await Products.create(product);
        res.status(201).json({ message: "product created" });
    } catch (error) {
        res.status(500).json({ error });
    }
});

module.exports = router;