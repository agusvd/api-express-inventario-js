import express from 'express';

import categoryRoutes from './routes/category.routes.js';
import productRoutes from './routes/products.routes.js';
import authRoutes from './routes/auth.routes.js';
import { PORT } from './secrets.js';

const app = express();

app.use(express.json());

app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log('Servidor conectado en el puerto:'+ PORT);
})