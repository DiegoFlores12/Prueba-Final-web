async function obtenerTodos(entidad) {
  const res = await fetch(`http://localhost:3000/${entidad}`);
  if (!res.ok) throw new Error(`Error al obtener ${entidad}`);
  return await res.json();
}
