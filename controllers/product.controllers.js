const Product = require('../services/product.services');
const NewProduct = require('../models/product');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.getProducts({});
    return res.status(200).json(products);
  } catch (e) {
    return res.status(400);
  }
};

exports.getProduct = async (request, response) => {
  try {
    const getResult = await Product.getProduct({ sku: request.params.sku });
    if (getResult != null) {
      response.json(getResult);
    } else {
      response.sendStatus(404);
    }
  } catch (e) {
    response.status(500);
  }
};

exports.postProduct = async (request, response) => {
  try {
    const newUser = await new NewProduct(request.body).save();
    return response.status(201).json({ data: newUser, message: 'User created successfully' });
  } catch (e) {
    return response.status(500).json({ status: 500, message: e.message });
  }
};

exports.deleteProducts = async (request, response) => {
  try {
    await Product.deleteProducts(request.query);
    return response.status(200).json({ status: 200 });
  } catch (e) {
    return response.status(500).json({ status: 500 });
  }
};

exports.deleteProduct = async (request, response) => {
  try {
    await Product.deleteProduct({ sku: request.params.sku });
    return response.status(200).json({ status: 200 });
  } catch (e) {
    return response.status(500).json({ status: 500 });
  }
};

exports.putProduct = async (request, response) => {
  try {
    const { sku } = request.params;
    const product = request.body;
    product.sku = sku;
    await Product.putProduct({ sku: request.params.sku }, product);
    response.sendStatus(200);
  } catch (e) {
    response.sendStatus(500);
  }
};

exports.patchProduct = async (request, response) => {
  try {
    const { sku } = request.params;
    const product = request.body;
    delete product.sku;
    const patchResult = await Product.patchProduct({ sku }, product, { new: true });
    if (patchResult != null) {
      response.json(patchResult);
    } else {
      response.sendStatus(404);
    }
  } catch (e) {
    response.sendStatus(500);
  }
};
