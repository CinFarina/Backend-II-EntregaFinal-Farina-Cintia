require('dotenv').config();
const express = require('express');
const handlebars = require('express-handlebars');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const path = require('path');

const productRouter = require('./src/routes/products.router');
const sessionsRouter = require('./src/routes/sessions.router');
const usersRouter = require('./src/routes/users.router');
const viewsRouter = require('./src/routes/views.router');
const cartsRouter = require('./src/routes/carts.router');

const ProductModel = require('./src/dao/models/product.model');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'handlebars');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error conectando MongoDB:', err));

app.use('/api/products', productRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/users', usersRouter);
app.use('/', viewsRouter);
app.use('/api/carts', cartsRouter);


app.use((req, res) => {
  res.status(404).send({ error: 'Ruta no encontrada' });
});

const httpServer = app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

const io = new Server(httpServer);

io.on('connection', async (socket) => {
  console.log('Cliente conectado vía WebSocket');

  try {
    const products = await ProductModel.find().lean();
    socket.emit('productsUpdated', products);
  } catch (err) {
    console.error("Error enviando productos iniciales:", err);
  }

  socket.on('addProduct', async (productData) => {
    try {
      if (!productData.title || productData.price <= 0) {
        throw new Error("Datos inválidos");
      }
      if (typeof productData.thumbnails === 'string') {
        productData.thumbnails = productData.thumbnails.split(',').map(s => s.trim());
      }
      await ProductModel.create(productData);
      const updated = await ProductModel.find().lean();
      io.emit('productsUpdated', updated);
    } catch (err) {
      socket.emit('error', { message: err.message });
    }
  });

  socket.on('deleteProduct', async (productId) => {
    try {
      await ProductModel.findByIdAndDelete(productId);
      const updated = await ProductModel.find().lean();
      io.emit('productsUpdated', updated);
    } catch (err) {
      socket.emit('error', { message: err.message });
    }
  });
});