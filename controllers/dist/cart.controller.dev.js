"use strict";

var _require = require("../data/products.data"),
    products = _require.products;

var _require2 = require("../data/users.data"),
    users = _require2.users;

exports.addToCart = function (req, res) {
  var userId = req.userId;
  var _req$body = req.body,
      productId = _req$body.productId,
      quantity = _req$body.quantity;
  var user = users.find(function (user) {
    return user.id === userId;
  });
  var product = products.find(function (product) {
    return product.id === productId;
  });
  var cartItem = user.cart.find(function (item) {
    return item.productId === productId;
  });

  if (cartItem) {
    cartItem.quantity += quantity;
  } else {
    cartItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      discount: product.discount,
      image: product.image
    };
    user.cart.push(cartItem);
  }

  res.status(200).json({
    cart: cartItem
  });
};

exports.getCart = function (req, res) {
  var userId = req.userId;
  var user = users.find(function (user) {
    return user.id === userId;
  });
  res.status(200).json({
    cart: user.cart
  });
};

exports.updateQuantity = function (req, res) {
  try {
    var userId = req.userId;
    var _req$body2 = req.body,
        productId = _req$body2.productId,
        quantityChange = _req$body2.quantityChange;

    if (!productId || quantityChange == null) {
      return res.status(400).json({
        error: "Invalid input data"
      });
    } // Tìm user theo userId


    var user = users.find(function (user) {
      return user.id === userId;
    });

    if (!user) {
      return res.status(404).json({
        error: "User not found"
      });
    } // Tìm sản phẩm trong giỏ hàng của user


    var cartItem = user.cart.find(function (item) {
      return item.productId === productId;
    });

    if (!cartItem) {
      return res.status(404).json({
        error: "Item not found in cart"
      });
    } // Cập nhật số lượng


    cartItem.quantity += quantityChange; // Nếu số lượng <= 0, xóa sản phẩm khỏi giỏ hàng

    if (cartItem.quantity <= 0) {
      user.cart = user.cart.filter(function (item) {
        return item.productId !== productId;
      });
      return res.status(200).json({
        message: "Item removed from cart",
        cart: user.cart
      });
    } 


    return res.status(200).json({
      success: true,
      cart: user.cart
    });
  } catch (error) {
    console.error("Error updating quantity:", error);
    return res.status(500).json({
      error: "Internal Server Error"
    });
  }
};