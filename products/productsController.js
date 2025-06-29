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
    const { name, description, price, img_url, stock } = req.body;
    const product = { name, description, price, img_url, stock }

    try {
        await Products.create(product);
        res.status(201).json({ message: "Produto criado com sucesso.", product });
    } catch (error) {
        res.status(500).json({ error });
    }
});

router.put(`/${process.env.PUT_ROUTE}/:id`, async (req, res) => {
    const id = req.params.id;
    const { name, description, price, img_url, stock } = req.body;
    const product = { name, description, price, img_url, stock }
    console.log(id)

    try {
        const updateProduct = await Products.updateOne({ _id: id }, product);
        if (updateProduct.modifiedCount === 1) {
            res
                .status(200)
                .json({ message: "Sucesso. Produto atualizado", product });
        }
        res
            .status(400)
            .json({
                message: "Houve uma falha. Verifique se de fato você modificou os valores de todos os campos: name, description, price, img_url e stock ",
            });
    } catch (error) {
        res.status(500).json({ error });
    }
});

router.delete(`/${process.env.DELETE_ROUTE}/:id`, async (req, res) => {
    const id = req.params.id;

    try {
        const deleteProduct = await Products.deleteOne({ _id: id });

        if (deleteProduct.deletedCount === 1) {
            res
                .status(200)
                .json({ message: "Produto excluido com sucesso" });
        }
        res
            .status(400)
            .json({
                message: "Houve uma falha. Verifique se o id está correto ",
            });

    } catch (error) {
        res.status(500).json({ error });
    }
});


module.exports = router;