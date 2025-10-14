const CartModel = require('../dao/models/cart.model');
const ProductModel = require('../dao/models/product.model');
const TicketModel = require('../dao/models/ticket.model');
const { v4: uuidv4 } = require('uuid');

const purchaseCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await CartModel.findById(cid).populate('products.product');

    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

    let totalAmount = 0;
    const productsNotProcessed = [];

    for (const item of cart.products) {
      const product = await ProductModel.findById(item.product._id);

      if (product.stock >= item.quantity) {
        product.stock -= item.quantity;
        await product.save();

        totalAmount += product.price * item.quantity;
      } else {
        productsNotProcessed.push(item.product._id);
      }
    }

    // Crear el ticket de compra
    const ticket = await TicketModel.create({
      code: uuidv4(),
      amount: totalAmount,
      purchaser: req.user.email
    });

    cart.products = cart.products.filter(p => productsNotProcessed.includes(p.product._id));
    await cart.save();

    res.status(200).json({
      message: 'Compra finalizada',
      ticket,
      productsNotProcessed
    });

  } catch (error) {
    console.error('Error en purchaseCart:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { purchaseCart };
