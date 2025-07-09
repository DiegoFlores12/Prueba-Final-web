const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET todos los productos
router.get('/', async (req, res) => {
  const productos = await prisma.producto.findMany({ include: { categoria: true } });
  res.json(productos);
});

// GET producto por ID
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const producto = await prisma.producto.findUnique({
    where: { id },
    include: { categoria: true }
  });
  if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(producto);
});

// POST nuevo producto
router.post('/', async (req, res) => {
  const { nombre, precio, stock, categoriaId } = req.body;
  const nuevo = await prisma.producto.create({ data: { nombre, precio, stock, categoriaId } });
  res.status(201).json(nuevo);
});

// PUT actualizar producto por ID
router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, precio, stock, categoriaId } = req.body;
  try {
    const actualizado = await prisma.producto.update({
      where: { id },
      data: { nombre, precio, stock, categoriaId }
    });
    res.json(actualizado);
  } catch {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// DELETE producto por ID
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.producto.delete({ where: { id } });
    res.json({ message: 'Producto eliminado' });
  } catch {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

module.exports = router;
