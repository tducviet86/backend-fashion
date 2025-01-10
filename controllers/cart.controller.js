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
  try {
    const { itemId, newQuantity } = req.body;

    if (!itemId || newQuantity == null) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    // Tìm item trong giỏ hàng
    const cartItem = cart.find((item) => item.id === itemId);

    if (!cartItem) {
      return res.status(404).json({ error: "Item not found in cart" });
    }

    // Cập nhật số lượng
    cartItem.quantity = newQuantity;

    // Trả về giỏ hàng đã cập nhật
    return res.status(200).json({ success: true, cart: cart });
  } catch (error) {
    console.error("Error updating quantity:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
