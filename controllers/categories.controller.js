const { categories } = require("../data/category.data");
const { products } = require("../data/products.data");

exports.getCategories = (req, res) => {
  res.status(200).json({
    categories,
  });
};

exports.getProductsByCategory = (req, res) => {
  const { id } = req.params;
  const categoryId = parseInt(id);

  const filterProduct = products.filter(
    (item) => item.category.id === categoryId
  );
  res.status(200).json({
    products: filterProduct,
  });
};
