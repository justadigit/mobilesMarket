const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    specification: {
      type: String,
      required: true,
    },
    relatedImage: [
      {
        type: String,
        requried: true,
      },
    ],
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model('Product', productSchema);
