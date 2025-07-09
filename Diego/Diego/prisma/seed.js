const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.categoria.createMany({
    data: [
      { nombre: 'Armas' },
      { nombre: 'accesorios' },
      { nombre: 'antiguedad' },
    ],
    skipDuplicates: true,
  });

  await prisma.producto.createMany({
    data: [
      { nombre: 'Moneda antigua', precio: 50000, stock: 200, categoriaId: 1 },
      { nombre: 'Arma medieval', precio: 75000, stock: 150, categoriaId: 1 },
      { nombre: 'Reloj antiguo', precio: 20000, stock: 3000, categoriaId: 2 },
      { nombre: 'Collar maya', precio: 15000, stock: 25, categoriaId: 3 },
    ],
    skipDuplicates: true,
  });

  await prisma.pedido.createMany({
    data: [
      { productoId: 1, cantidad: 2 },
      { productoId: 3, cantidad: 1 },
    ],
    skipDuplicates: true,
  });

  console.log('Seeding completado.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
