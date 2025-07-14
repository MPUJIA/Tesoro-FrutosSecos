const productosContainer = document.querySelector('.productos-container');

// Renderizar productos en la página
function renderizarProductos() {
  productosContainer.innerHTML = '';
  productos.forEach(producto => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="imagen-wrapper">
        <img class="img-normal" src="${producto.imgNormal}" alt="${producto.nombre}">
        <img class="img-hover" src="${producto.imgHover}" alt="${producto.nombre}">
      </div>
      <h3>${producto.nombre}</h3>
      <p>Precio: $${producto.precio}</p>
      <button class="boton-comprar" data-id="${producto.id}">Comprar</button>
    `;
    productosContainer.appendChild(card);
  });

  // Asignar eventos a los botones de comprar DESPUÉS de renderizar
  document.querySelectorAll('.boton-comprar').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.getAttribute('data-id'));
      agregarAlCarrito(id);
      actualizarCantidadCarrito(); 
    });
  });
}

renderizarProductos();

