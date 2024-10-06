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
exports.getChildrenByCategory = (req, res) => {
  const { id } = req.params;
  const categoryId = parseInt(id);

  const category = categories.find((item) => item.id === categoryId);
  res.status(200).json({
    categories: category.children,
  });
};
exports.getProductByChildren = (req, res) => {
  const { id } = req.params;
  const childrenCate = parseInt(id);

  const filterProducts = products.find(
    (item) => item.childrenCategory.id === childrenCate
  );
  res.status(200).json({
    products: filterProducts,
  });
};
