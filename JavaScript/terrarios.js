// Variables globales para los productos y sus precios
let productos = [
    { nombre: "Terrario Desértico", precio: 15000 },
    { nombre: "Terrario Boscoso", precio: 20000 },
    { nombre: "Terrario Pantanoso", precio: 22000 },
    { nombre: "Terrario Montañoso", precio: 30000 }
];

let carrito = [];
let total = 0.00;

// Función para agregar productos al carrito
function addToCart(nombre, precio) {
    // Verificar si el producto ya está en el carrito
    let productoEnCarrito = carrito.find(item => item.nombre === nombre);
    
    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;  // Incrementa la cantidad
        productoEnCarrito.precioTotal += precio;  // Actualiza el precio total
    } else {
        carrito.push({ nombre: nombre, precio: precio, cantidad: 1, precioTotal: precio });
    }
    
    calcularTotal();  // Calcular el total después de agregar al carrito
    actualizarCarrito();  // Actualiza el DOM
}

// Función para calcular el total
function calcularTotal() {
    total = carrito.map(item => item.precioTotal).reduce((acc, precio) => acc + precio, 0);
}

// Función para actualizar el DOM con el carrito
function actualizarCarrito() {
    const cartItemsElement = document.getElementById("cartItems");
    const cartTotalElement = document.getElementById("cartTotal");
    
    cartItemsElement.innerHTML = "";  // Limpiar lista del carrito
    carrito.forEach(item => {
        let li = document.createElement("li");
        li.textContent = `${item.nombre} x ${item.cantidad} - $${item.precioTotal}`;
        cartItemsElement.appendChild(li);
    });
    
    cartTotalElement.textContent = Math.round(total);
}

// Función para finalizar la compra
function finalizarCompra() {
    if (carrito.length > 0) {
        alert(`Has comprado los siguientes productos:\n${carrito.map(item => item.producto).join("\n")}\n\nTotal a pagar: $${Math.round(total)}`);
        console.log("Compra finalizada. Total: $" + Math.round(total));
        // Reiniciar carrito
        carrito = [];
        total = 0.00;
        actualizarCarrito();
    } else {
        alert("No has agregado ningún producto al carrito.");
        console.log("No se realizó ninguna compra.");
    }
}