let carrito = [];

const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = document.getElementById('total-carrito');
const cantidadCarrito = document.getElementById('cantidad-carrito');
const detalleCarrito = document.getElementById('carrito-detalle');
const abrirCarrito = document.getElementById('abrir-carrito');
const vaciarCarrito = document.getElementById('vaciar-carrito');
const finalizarCompra = document.getElementById('finalizar-compra');
const mensajeFinal = document.getElementById('mensaje-final');

// Agregar producto al carrito
function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  const existente = carrito.find(item => item.id === id);
  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }
  actualizarCarrito();
}

// Guardar y cargar carrito en localStorage
function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}
function cargarCarrito() {
  const guardado = localStorage.getItem('carrito');
  carrito = guardado ? JSON.parse(guardado) : [];
}

// Actualizar vista del carrito
function actualizarCarrito() {
  if (!listaCarrito || !totalCarrito) {
    // Solo actualiza la cantidad en el botón si no estamos en la página del carrito
    actualizarCantidadCarrito();
    guardarCarrito();
    return;
  }
  listaCarrito.innerHTML = '';
  let total = 0;
  carrito.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad}`;
    listaCarrito.appendChild(li);
    total += item.precio * item.cantidad;
  });
  totalCarrito.textContent = total;
  cantidadCarrito.textContent = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  guardarCarrito();
}

function actualizarCantidadCarrito() {
  const cantidadCarrito = document.getElementById('cantidad-carrito');
  const guardado = localStorage.getItem('carrito');
  let carrito = guardado ? JSON.parse(guardado) : [];
  const cantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  cantidadCarrito.textContent = cantidad;
}

// Eventos del carrito
abrirCarrito.addEventListener('click', () => {
  detalleCarrito.style.display = detalleCarrito.style.display === 'none' ? 'block' : 'none';
  mensajeFinal.textContent = '';
});
if (vaciarCarrito && finalizarCompra && mensajeFinal) {
  vaciarCarrito.addEventListener('click', () => {
    carrito = [];
    actualizarCarrito();
    mensajeFinal.textContent = '';
  });
  finalizarCompra.addEventListener('click', () => {
    if (carrito.length === 0) {
      mensajeFinal.textContent = 'El carrito está vacío.';
      return;
    }
    mensajeFinal.textContent = '¡Gracias por tu compra! Pronto nos contactaremos contigo.';
    carrito = [];
    actualizarCarrito();
  });
}

// Inicialización
renderizarProductos();
cargarCarrito();
actualizarCarrito();
actualizarCantidadCarrito();