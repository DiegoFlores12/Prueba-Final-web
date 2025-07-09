const express = require('express');
const app = express();
const cors = require('cors');
const productosRoutes = require('./routes/productos');
const categoriasRoutes = require('./routes/categorias');
const pedidosRoutes = require('./routes/pedidos');

app.use(cors());
app.use(express.json());

// Rutas
app.use('/productos', productosRoutes);
app.use('/categorias', categoriasRoutes);
app.use('/pedidos', pedidosRoutes);

app.get('/', (req, res) => {
  res.send('Tienda de antiguedades');
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
