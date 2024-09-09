const express = require('express');
const app = express();
const port = 8080;

// Middleware para interpretar JSON
app.use(express.json());

// Rutas para productos y carritos
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Servir archivos estáticos del frontend (HTML, CSS, JS del cliente)
app.use(express.static('Assets'));
app.use(express.static('Css'));
app.use(express.static('JavaScript'));
app.use(express.static('Pages'));

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});