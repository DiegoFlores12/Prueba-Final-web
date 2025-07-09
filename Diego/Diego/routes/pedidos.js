const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET todos los pedidos
router.get('/', async (req, res) => {
  const pedidos = await prisma.pedido.findMany({
    include: { producto: true }
  });
  res.json(pedidos);
});

// GET producto por ID
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const pedido = await prisma.pedido.findUnique({
    where: { id },
    include: { producto: true }
  });
  if (!pedido) return res.status(404).json({ error: 'pedido no encontrado' });
  res.json(pedido);
});

// POST nuevo pedido
router.post('/', async (req, res) => {
  const { productoId, cantidad } = req.body;
  const nuevo = await prisma.pedido.create({
    data: { productoId, cantidad }
  });
  res.status(201).json(nuevo);
});

// PUT actualizar producto por ID
router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { productoId , cantidad} = req.body;
  try {
    const actualizado = await prisma.pedido.update({
      where: { id },
      data: { productoId, cantidad }
    });
    res.json(actualizado);
  } catch {
    res.status(404).json({ error: 'pedido no encontrado' });
  }
});

// DELETE producto por ID
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.pedido.delete({ where: { id } });
    res.json({ message: 'pedido eliminado' });
  } catch {
    res.status(404).json({ error: 'pedido no encontrado' });
  }
});

module.exports = router;
