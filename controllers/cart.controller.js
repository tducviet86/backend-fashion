const { products } = require("../data/products.data");
const { users } = require("../data/users.data");

exports.addToCart = (req, res) => {
  const userId = req.userId;
  const { productId, quantity } = req.body;

  const user = users.find((user) => user.id === userId);

  const product = products.find((product) => product.id === productId);

  let cartItem = user.cart.find((item) => item.productId === productId);
  if (cartItem) {
    cartItem.quantity += quantity;
  } else {
    cartItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      discount: product.discount,
      image: product.image,
    };
    user.cart.push(cartItem);
  }
  res.status(200).json({
    cart: cartItem,
  });
};
exports.getCart = (req, res) => {
  const userId = req.userId;
  const user = users.find((user) => user.id === userId);
  res.status(200).json({
    cart: user.cart,
  });
};
exports.updateQuantity = (req, res) => {
  const userId = req.userId;
  const { productId, quantityChange } = req.body;

  const user = users.find((user) => user.id === userId);

  const cartItem = user.cart.find((item) => item.productId === productId);

  cartItem.quantity += quantityChange;

  if (cartItem.quantity <= 0) {
    user.cart = user.cart.filter((item) => item.productId !== productId);
    return res
      .status(200)
      .json({ message: "Item removed from cart", cart: user.cart });
  }

  return res.status(200).json({ success: true, cart: user.cart });
};
exports.deleteFromCart = (req, res) => {
  const userId = req.userId;
  const { productId } = req.params;

  // Tìm người dùng
  const user = users.find((user) => user.id === userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Kiểm tra sản phẩm trong giỏ hàng
  const cartItem = user.cart.find(
    (item) => item.productId === parseInt(productId)
  );
  if (!cartItem) {
    return res.status(404).json({ message: "Product not found in cart" });
  }

  // Xóa sản phẩm khỏi giỏ hàng
  user.cart = user.cart.filter(
    (item) => item.productId !== parseInt(productId)
  );

  res.status(200).json({
    message: "Product removed from cart",
    cart: user.cart,
  });
};
