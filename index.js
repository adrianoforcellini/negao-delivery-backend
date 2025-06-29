const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

require("dotenv").config();

app.use(express.json());
app.use(cors());

const productsController = require("./products/productsController");
app.use("/products", productsController);

const usersController = require("./products/usersController");
app.use("/users", usersController);

mongoose
    .connect(
        `mongodb+srv://${process.env.MONGOOSE_CONNECTION_STRING}/?retryWrites=true&w=majority&appName=Negaodelivery`
    )
    .then((r) => {
        app.listen(3000);
    })