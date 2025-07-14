let carrito = [];

const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = document.getElementById('total-carrito');
const finalizarCompra = document.getElementById('finalizar-compra');
const vaciarCarrito = document.getElementById('vaciar-carrito');
const mensajeFinal = document.getElementById('mensaje-final');

function cargarCarrito() {
  const guardado = localStorage.getItem('carrito');
  carrito = guardado ? JSON.parse(guardado) : [];
}

function actualizarCarrito() {
  listaCarrito.innerHTML = '';
  let total = 0;
  carrito.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      <img src="${item.imgNormal}" alt="${item.nombre}" style="width:40px;vertical-align:middle;margin-right:8px;">
      ${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad}
    `;
    listaCarrito.appendChild(li);
    total += item.precio * item.cantidad;
  });
  totalCarrito.textContent = total;
}

vaciarCarrito.addEventListener('click', () => {
  carrito = [];
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCarrito();
  mensajeFinal.textContent = '';
});

finalizarCompra.addEventListener('click', () => {
  if (carrito.length === 0) {
    mensajeFinal.textContent = 'El carrito está vacío.';
    return;
  }

  // Generar el mensaje con el detalle del carrito
  let mensaje = '¡Hola! Quiero finalizar mi compra:%0A';
  let total = 0;
  carrito.forEach(item => {
    mensaje += `- ${item.nombre} x${item.cantidad} = $${item.precio * item.cantidad}%0A`;
    total += item.precio * item.cantidad;
  });
  mensaje += `Total: $${total}`;

  // Número de WhatsApp (código de país + número, sin + ni espacios)
  const numero = '5491151123813'; // Reemplaza por tu número

  // Crear el enlace de WhatsApp
  const url = `https://wa.me/${numero}?text=${mensaje}`;

  // Abrir WhatsApp en una nueva pestaña
  window.open(url, '_blank');

  // Vaciar el carrito y actualizar la vista
  carrito = [];
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCarrito();
  mensajeFinal.textContent = '¡Gracias por tu compra! Te contactaremos por WhatsApp.';
});

cargarCarrito();
actualizarCarrito();