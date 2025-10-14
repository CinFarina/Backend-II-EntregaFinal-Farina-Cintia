const socket = io();

const list = document.getElementById('realTimeProductsList');
socket.on('productsUpdated', products => {
  list.innerHTML = '';
  products.forEach(p => {
    const li = document.createElement('li');
    li.textContent = `${p.title} - $${p.price}`;
    list.appendChild(li);
  });
});

const formAdd = document.getElementById('addProductForm');
formAdd?.addEventListener('submit', e => {
  e.preventDefault();
  const fd = new FormData(formAdd);
  let thumbnails = fd.get('thumbnails');
  if (thumbnails) {
    thumbnails = thumbnails.split(',').map(s => s.trim());
  }
  const product = {
    title: fd.get('title'),
    description: fd.get('description'),
    code: fd.get('code'),
    price: Number(fd.get('price')),
    stock: Number(fd.get('stock')),
    category: fd.get('category'),
    thumbnails
  };
  socket.emit('addProduct', product);
  formAdd.reset();
});
