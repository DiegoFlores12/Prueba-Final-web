async function cargarProductos() {
  const tbody = document.getElementById('resultado-lista');
  const mensaje = document.getElementById('mensaje');
  mensaje.textContent = 'Cargando...';
  tbody.innerHTML = '';

  try {
    const productos = await obtenerTodos('productos');

    if (productos.length === 0) {
      mensaje.textContent = 'No hay productos para mostrar.';
      return;
    }

    productos.forEach(p => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${p.id}</td>
        <td>${p.nombre}</td>
        <td>${p.precio}</td>
        <td>${p.stock}</td>
      `;
      tbody.appendChild(fila);
    });

    mensaje.textContent = '';

  } catch (err) {
    mensaje.textContent = `Error: ${err.message}`;
  }
}

window.onload = cargarProductos;
