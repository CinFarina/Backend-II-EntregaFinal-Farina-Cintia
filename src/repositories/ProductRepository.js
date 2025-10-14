const ProductDAO = require('../dao/ProductDAO');

class ProductRepository {
  constructor() {
    this.dao = new ProductDAO();
  }

  async createProduct(data) {
    if (!data.title || data.price <= 0) {
      throw new Error('Datos inválidos');
    }
    return await this.dao.create(data);
  }

  async getAll(filter, options) {
    return await this.dao.getAll(filter, options);
  }

  async getById(id) {
    return await this.dao.getById(id);
  }

  async updateProduct(id, data) {
    return await this.dao.update(id, data);
  }

  async deleteProduct(id) {
    return await this.dao.delete(id);
  }
}

module.exports = ProductRepository;
