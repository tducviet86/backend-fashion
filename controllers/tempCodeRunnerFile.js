exports.getProductsByCategory = (req, res) => {
  const { id } = req.params;
  const categoryId = parseInt(id);

  const { minPrice, maxPrice, color, size, childrenCategoryId } = req.query;
  const parsedMinPrice = parseFloat(minPrice);
  const parsedMaxPrice = parseFloat(maxPrice);

  let filteredProducts = products.filter(
    (item) => item.category.id === categoryId
  );

  if (parsedMinPrice) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= parsedMinPrice
    );
  }
  console.log();
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
  console.log(color);
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