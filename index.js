const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config();

const app = express();
app.use(express.static(`${__dirname}/public`));

const productsController = require("./controllers/products.controller");
const categoriesController = require("./controllers/categories.controller");
const authenticateJWT = require("./middlewares/authenticateJWT");
const authController = require("./controllers/auth.controller");
const cartController = require("./controllers/cart.controller");

const port = 3100;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("LetDiv");
});
app.route("/products").get(productsController.getProducts);
app.route("/products-tag").get(productsController.getProductsByTag);
app.route("/categories").get(categoriesController.getCategories);

app
  .route("/categories/:id/children")
  .get(categoriesController.getChildrenByCategory);
app
  .route("/categories/:id/products")
  .get(categoriesController.getProductsByFilters);

app.post("/auth/signup", authController.signup);
app.post("/auth/login", authController.login);

app.use(authenticateJWT);

app.route("/cart/add").post(cartController.addToCart);
app.route("/cart").get(cartController.getCart);

app.listen(port, () => {
  console.log(`LetDiv app listening on port ${port}`);
});
