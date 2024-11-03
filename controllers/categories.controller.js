const { categories } = require("../data/category.data");
const { products } = require("../data/products.data");

exports.getCategories = (req, res) => {
  res.status(200).json({
    categories,
  });
};

exports.getProductsByFilters = (req, res) => {
  const { id } = req.params;
  const categoryId = parseInt(id);

  const { minPrice, maxPrice, color, size, childrenCategoryId } = req.query;
  const parsedMinPrice = parseFloat(minPrice);
  const parsedMaxPrice = parseFloat(maxPrice);

  let filteredProducts = products.filter(
    (item) => item.category.id === categoryId
  );

  // if()
  if (parsedMinPrice) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= parsedMinPrice
    );
  }
  // console.log();
  if (childrenCategoryId) {
    const parsedChildrenCategoryId = parseInt(childrenCategoryId);
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.childrenCategory.id === Number(parsedChildrenCategoryId)
    );
  }

  if (parsedMaxPrice) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price <= parsedMaxPrice
    );
  }
  // console.log(color);
  if (color) {
    filteredProducts = filteredProducts.filter((product) =>
      product.colors.includes(color)
    );
  }

  if (size) {
    filteredProducts = filteredProducts.filter((product) =>
      product.sizes.includes(size)
    );
  }

  res.status(200).json({
    products: filteredProducts,
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

// exports.getProductByChildren = (req, res) => {
//   const { id } = req.params;

//   let filteredProducts = products.filter(
//     (product) => product.childrenCategory.id === parseInt(id)
//   );

//   res.status(200).json({
//     products: filteredProducts,
//   });
// };
