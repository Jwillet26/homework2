const Product = require('../models/product');

exports.getProducts = async (query) => {
  try {
    return await Product.find(query).select('-_id -__v');
  } catch (e) {
    // Log Errors
    throw Error('Error while Paginating products');
  }
};
exports.getProduct = async (sku) => {
  try {
    return await Product.findOne(sku).select('-_id -__v');
  } catch (e) {
    throw Error('Error while trying to get the product');
  }
};
exports.PostProduct = async (body) => {
  try {
    return new Product(body).save();
  } catch (e) {
    throw Error('Error while trying to post a product');
  }
};
exports.deleteProducts = async (query) => {
  try {
    return Product.deleteMany(query);
  } catch (e) {
    throw Error('Error while trying to delete the products');
  }
};
exports.deleteProduct = async (sku) => {
  try {
    return Product.deleteOne(sku);
  } catch (e) {
    throw Error('Error while trying to delete a product');
  }
};
exports.putProduct = async (sku, product) => {
  try {
    return Product.findOneAndReplace(sku, product, { upsert: true });
  } catch (e) {
    throw Error('Error while trying to update a product');
  }
};
exports.patchProduct = async (sku, product) => {
  try {
    return Product.findOneAndUpdate(sku, product, { new: true }).select('-_id -__v');
  } catch (e) {
    throw Error('Error while trying to update a product');
  }
};
