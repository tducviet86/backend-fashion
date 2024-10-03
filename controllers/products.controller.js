const { products } = require("../data/products.data");

exports.getProducts = (req, res) => {
  const { name } = req.query;
  let filterProducts = products;

  if (name) {
    filterProducts = filterProducts.filter((item) =>
      item.name.toLowerCase().includes(name.toLowerCase())
    );
  }
  //   console.log(products);

  res.status(200).json({
    products: filterProducts,
  });
};

exports.getProductsByTag = (req, res) => {
  const { tag } = req.query;
  let filterProductsByTag = products;
  if (tag) {
    filterProductsByTag = filterProductsByTag.filter(
      (item) => item.tag === tag
    );
  }
  res.status(200).json({
    products: filterProductsByTag,
  });
};
