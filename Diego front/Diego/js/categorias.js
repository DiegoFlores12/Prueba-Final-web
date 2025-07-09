async function cargarCategorias() {
  const tbody = document.getElementById('resultado-lista');
  const mensaje = document.getElementById('mensaje');
  mensaje.textContent = 'Cargando...';
  tbody.innerHTML = '';

  try {
    const categorias = await obtenerTodos('categorias');

    if (categorias.length === 0) {
      mensaje.textContent = 'No hay categorías para mostrar.';
      return;
    }

    categorias.forEach(c => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${c.id}</td>
        <td>${c.nombre}</td>
      `;
      tbody.appendChild(fila);
    });

    mensaje.textContent = '';

  } catch (err) {
    mensaje.textContent = `Error: ${err.message}`;
  }
}

window.onload = cargarCategorias;
