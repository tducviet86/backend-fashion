const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config();

const app = express();
app.use(express.static(`${__dirname}/public`));

const productsController = require("./controllers/products.controller");
const authenticateJWT = require("./middlewares/authenticateJWT");

const port = 3100;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("LetDiv");
});
app.route("/products").get(productsController.getProducts);
app.route("/products-tag").get(productsController.getProductsByTag);
// app.route("/products-categories").get(productsController.getCategories);

app.use(authenticateJWT);

app.listen(port, () => {
  console.log(`LetDiv app listening on port ${port}`);
});
