const router = require("express").Router();
const Users = require("../models/usersModel");
require("dotenv").config();



router.post(`/${process.env.USERS_GET_ROUTE}`, async (req, res) => {
   const { number, password } = req.body;
    try {
      const user = await Users.findOne( { number });
      if (user.password == password){
          res.status(200).json("login aceito");
      }else{
          res.status(301).json("senha incorreta");
      }
    } catch (erro) {
        res.status(500).json({ error });
    }
});


router.post(`/${process.env.USERS_POST_ROUTE}`, async (req, res) => {
    const { number, password } = req.body;
    const user = { number, password }

    try {
        await Users.create(user);
        res.status(201).json({ message: "Usuário criado com sucesso", user });
    } catch (error) {
        res.status(500).json({ error });
    }
});

router.put(`/${process.env.USERS_PUT_ROUTE}/:id`, async (req, res) => {
    const id = req.params.id;
    const { number, password } = req.body;
    const user = {number, password }

    try {
        const updateUser = await Users.updateOne({ _id: id }, user);
        if (updateUser.modifiedCount === 1) {
            res
                .status(200)
                .json({ message: "Usuário Atualizado com sucesso", user });
        }
        res
            .status(400)
            .json({
                message: "Houve uma falha. Verifique se de fato você modificou os valores dos campos: name, email, password ",
            });
    } catch (error) {
        res.status(500).json({ error });
    }
});

router.delete(`/${process.env.USERS_DELETE_ROUTE}/:id`, async (req, res) => {
    const id = req.params.id;

    try {
        const deleteUser = await Users.deleteOne({ _id: id });
        if (deleteUser.deletedCount === 1) {
            res
                .status(200)
                .json({ message: "Usuário excluido com sucesso" });
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