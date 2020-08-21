// index(all products) , product_detail,post_product , delete_product , get_editproduct , update_products

const Product = require('../../models/Product');

const index = (req, res) => {
  Product.find()
    .populate('categoryId')
    .sort({ createdAt: -1 })
    .then((data) => {
      if (data.length > 0) {
        res.status(200).json(data);
      } else {
        res.status(200).json({ Messge: 'No Data Yet' });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

const post_product = async (req, res) => {
  const name = await req.body.name;
  const price = await req.body.price;
  const specification = await req.body.specification;
  const image = await req.files.image;
  console.log(image[0].path);
  const relatedImage = await req.files.relatedImage;
  let relatedArr = [];

  relatedImage.map((item) => {
    relatedArr.push(item.path);
  });
  const product = new Product({
    name: name,
    price: price,
    specification: specification,
    image: image[0].path,
    relatedImage: relatedArr,
    categoryId: req.body.categoryId,
  });
  product
    .save()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
module.exports = {
  index,
  post_product,
};
