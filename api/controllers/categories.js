// index , detail, post_categories , delete_categories , get_editcategory , update_category
const Category = require('../../models/Category');
const Product = require('../../models/Product');

const index = (req, res) => {
  Category.find()
    .then((data) => {
      if (data.length > 0) {
        res.status(200).json(data);
      } else {
        res.status(200).json({ Message: 'No Data Yet!' });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

const detail = (req, res, next) => {
  const name = req.params.name;
  Category.find({ name: name })
    .then((getdata) => {
      if (getdata.length > 0) {
        Product.find({ categoryId: getdata[0]._id })
          .then((products) => {
            if (products.length > 0) {
              res.status(200).json(products);
            } else {
              res.status(404).json('No Data for This!');
            }
          })
          .catch((err) => {
            res.status(500).json(err);
          });
      } else {
        res.status(404).json('Not Found!');
      }
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};

const post_categories = (req, res) => {
  const name = req.body.name.toLowerCase();
  const category = new Category({
    name: name,
  });
  category
    .save()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

const delete_categories = (req, res) => {
  const id = req.params.id;
  Category.findByIdAndDelete(id)
    .then((data) => {
      res.status(200).json({ Message: 'Delete Successfully!' });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

const update_categories = (req, res) => {
  const id = req.params.id;
  Category.findByIdAndUpdate(
    id,
    {
      name: req.body.name,
    },
    (err, doc) => {
      if (!err) {
        res.status(200).json({
          message: 'Update SuccessFully!',
          data: doc,
        });
      } else {
        res.status(500).json(err);
      }
    }
  );
};

module.exports = {
  index,
  detail,
  post_categories,
  delete_categories,
  update_categories,
};
