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
  const { color, size, minPrice, maxPrice, category } = req.query;

  let filterProduct = products.filter(
    (item) => item.category.id === categoryId
  );

  if (color) {
    filterProduct = filterProduct.filter((item) => item.colors.includes(color));
  }

  if (size) {
    filterProduct = filterProduct.filter((item) => item.sizes.includes(size));
  }

  if (minPrice || maxPrice) {
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);
    filterProduct = filterProduct.filter(
      (item) => item.price >= min && item.price <= max
    );
  }
  if (category) {
    filterProduct = filterProduct.filter(
      (item) => item.category.name === category
    );
  }

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

  const filterProducts = products.filter(
    (item) => item.childrenCategory.id === childrenCate
  );
  res.status(200).json({
    products: filterProducts,
  });
};
