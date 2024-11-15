const { products } = require("../data/products.data");
const { users } = require("../data/users.data");

exports.addToCart = (req, res) => {
  const { userId, productId, quantity } = req.body;

  const user = users.find((user) => user.id === userId);

  const product = products.find((product) => product.id === productId);

  const cartItem = user.cart.find((item) => item.productId === productId);
  if (cartItem) {
    cartItem.quantity += quantity;
  } else {
    user.cart.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      discount: product.discount,
      image: product.image,
    });
  }
  res.status(200).json({
    cart: user.cart,
  });
};
