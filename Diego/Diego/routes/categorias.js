const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET todas las categorías
router.get('/', async (req, res) => {
  const categorias = await prisma.categoria.findMany();
  res.json(categorias);
});

// GET cateogia por ID
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const categoria = await prisma.categoria.findUnique({
    where: { id },
  });
  if (!categoria) return res.status(404).json({ error: 'categoria no encontrado' });
  res.json(categoria);
});

// POST nueva categoría
router.post('/', async (req, res) => {
  const { nombre } = req.body;
  const nueva = await prisma.categoria.create({
    data: { nombre }
  });
  res.status(201).json(nueva);
});


router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.categoria.delete({ where: { id } });
    res.json({ message: 'Producto eliminado' });
  } catch {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});



router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre } = req.body;
  try {
    const actualizado = await prisma.categoria.update({
      where: { id },
      data: { nombre }
    });
    res.json(actualizado);
  } catch {
    res.status(404).json({ error: 'categoria no encontrado' });
  }
});

module.exports = router;
