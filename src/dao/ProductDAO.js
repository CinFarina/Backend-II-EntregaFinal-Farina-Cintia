const ProductModel = require('./models/product.model');

class ProductDAO {
  async create(data) {
    return await ProductModel.create(data);
  }
  async getById(id) {
    return await ProductModel.findById(id).lean();
  }
  async getAll(filter = {}, options = {}) {
    return await ProductModel.find(filter, null, options).lean();
  }
  async update(id, updateData) {
    return await ProductModel.findByIdAndUpdate(id, updateData, { new: true }).lean();
  }
  async delete(id) {
    return await ProductModel.findByIdAndDelete(id).lean();
  }
}

module.exports = ProductDAO;
