const ProductRepository = require('../repositories/ProductRepository');
const productRepo = new ProductRepository();

const getProducts = async (req, res) => {
  try {
    const products = await productRepo.getAll({}, {});
    res.json({ status: 'success', payload: products });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = await productRepo.createProduct(req.body);
    res.status(201).json({ status: 'success', payload: product });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const updated = await productRepo.updateProduct(pid, req.body);
    res.json({ status: 'success', payload: updated });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const deleted = await productRepo.deleteProduct(pid);
    res.json({ status: 'success', payload: deleted });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};

module.exports = { getProducts, createProduct, updateProduct, deleteProduct };