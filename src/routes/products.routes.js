import { Router } from 'express';
import { prisma } from '../db.js'

const router = Router();

// obtener todos los productos
router.get('/products', async (req, res) => {
    const products = await prisma.product.findMany()
    res.json(products);
});

// obtener producto especifico por id
router.get('/products/:id', async (req, res) => {
    const productFound = await prisma.product.findUnique({
        where: {
            id: parseInt(req.params.id)
        },
        include: {
            category: true
        }
    });

    if (!productFound) 
        return res.status(404).json({ error: "Producto no encontrado" });
    return res.json(productFound);
});

// crear un nuevo producto
router.post('/products', async (req, res) => {
    const newProduct = await prisma.product.create({
        data: req.body
    });
    res.json(newProduct);
});

// eleminar un producto
router.delete('/products/:id', async (req, res) => {
    const productDeleted = await prisma.product.delete({
        where: {
            id: parseInt(req.params.id)
        }
    });
    if (!productDeleted)
        return res.status(404).json({ error: "Producto no encontrado" });
    return res.json(productDeleted);
});

// actualizar un producto especifico
router.put('/products/:id', async (req, res) => {
    const productUpdated = await prisma.product.update({
        where: {
            id: parseInt(req.params.id)
        },
        data: req.body
    });
    if (!productUpdated)
        return res.status(404).json({ error: "Producto no encontrado" });
    return res.json(productUpdated);
});

export default router;