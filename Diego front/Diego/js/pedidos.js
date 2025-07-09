async function cargarPedidos() {
  const tbody = document.getElementById('resultado-lista');
  const mensaje = document.getElementById('mensaje');
  mensaje.textContent = 'espere';
  tbody.innerHTML = '';

  try {
    const pedidos = await obtenerTodos('pedidos');

    if (pedidos.length === 0) {
      mensaje.textContent = 'No hay pedidos para mostrar.';
      return;
    }

    pedidos.forEach(p => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${p.id}</td>
        <td>${p.cantidad}</td>
        <td>${p.productoId}</td>
      `;
      tbody.appendChild(fila);
    });

    mensaje.textContent = '';

  } catch (err) {
    mensaje.textContent = `Error: ${err.message}`;
  }
}

window.onload = cargarPedidos;
