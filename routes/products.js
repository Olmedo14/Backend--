const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = './data/productos.json';

// GET: Obtener todos los productos
router.get('/', (req, res) => {
    const productos = JSON.parse(fs.readFileSync(path, 'utf-8'));
    const limit = req.query.limit;
    res.json(limit ? productos.slice(0, limit) : productos);
});

// GET: Obtener producto por ID
router.get('/:pid', (req, res) => {
    const productos = JSON.parse(fs.readFileSync(path, 'utf-8'));
    const producto = productos.find(p => p.id == req.params.pid);
    producto ? res.json(producto) : res.status(404).json({ message: "Producto no encontrado" });
});

// POST: Agregar un nuevo producto
router.post('/', (req, res) => {
    const productos = JSON.parse(fs.readFileSync(path, 'utf-8'));
    const nuevoProducto = { id: productos.length + 1, ...req.body, status: true };
    productos.push(nuevoProducto);
    fs.writeFileSync(path, JSON.stringify(productos));
    res.status(201).json(nuevoProducto);
});

// PUT: Actualizar un producto por ID
router.put('/:pid', (req, res) => {
    let productos = JSON.parse(fs.readFileSync(path, 'utf-8'));
    const index = productos.findIndex(p => p.id == req.params.pid);
    if (index !== -1) {
        productos[index] = { ...productos[index], ...req.body };
        fs.writeFileSync(path, JSON.stringify(productos));
        res.json(productos[index]);
    } else {
        res.status(404).json({ message: "Producto no encontrado" });
    }
});

// DELETE: Eliminar un producto por ID
router.delete('/:pid', (req, res) => {
    let productos = JSON.parse(fs.readFileSync(path, 'utf-8'));
    productos = productos.filter(p => p.id != req.params.pid);
    fs.writeFileSync(path, JSON.stringify(productos));
    res.json({ message: "Producto eliminado" });
});

module.exports = router;