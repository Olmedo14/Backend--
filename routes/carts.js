const express = require('express');
const router = express.Router();
const fs = require('fs');
const pathCarts = './data/carrito.json';
const pathProducts = './data/productos.json';

// POST: Crear un nuevo carrito
router.post('/', (req, res) => {
    let carritos = JSON.parse(fs.readFileSync(pathCarts, 'utf-8'));
    const nuevoCarrito = { id: carritos.length + 1, products: [] };
    carritos.push(nuevoCarrito);
    fs.writeFileSync(pathCarts, JSON.stringify(carritos));
    res.status(201).json(nuevoCarrito);
});

// GET: Obtener productos de un carrito por ID
router.get('/:cid', (req, res) => {
    const carritos = JSON.parse(fs.readFileSync(pathCarts, 'utf-8'));
    const carrito = carritos.find(c => c.id == req.params.cid);
    carrito ? res.json(carrito.products) : res.status(404).json({ message: "Carrito no encontrado" });
});

// POST: Agregar producto a un carrito
router.post('/:cid/product/:pid', (req, res) => {
    const carritos = JSON.parse(fs.readFileSync(pathCarts, 'utf-8'));
    const productos = JSON.parse(fs.readFileSync(pathProducts, 'utf-8'));

    const carrito = carritos.find(c => c.id == req.params.cid);
    const producto = productos.find(p => p.id == req.params.pid);

    if (carrito && producto) {
        const productoEnCarrito = carrito.products.find(p => p.id == producto.id);
        if (productoEnCarrito) {
            productoEnCarrito.quantity += 1;
        } else {
            carrito.products.push({ id: producto.id, quantity: 1 });
        }
        fs.writeFileSync(pathCarts, JSON.stringify(carritos));
        res.status(201).json(carrito);
    } else {
        res.status(404).json({ message: "Carrito o producto no encontrado" });
    }
});

module.exports = router;