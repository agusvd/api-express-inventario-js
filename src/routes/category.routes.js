import { Router } from 'express';
import { prisma } from '../db.js'

const router = Router();

// obtener todas las categorias
router.get('/category', async (req, res) => {
    const categories = await prisma.category.findMany({
        include: {
            products: true
        }
    })
    res.json(categories);
});

// crear una nueva categoria
router.post('/category', async (req, res) => {
    const newCategory = await prisma.category.create({
        data: req.body
    });
    res.json(newCategory);
});

export default router;