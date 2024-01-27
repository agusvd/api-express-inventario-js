import { prisma } from '../db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../secrets.js'

export const signup = async (req, res) => {
    const { email, name, password } = req.body

    try {
        if (!password) {
            return res.status(400).json({ error: 'La contraseña es obligatoria' });
        }

        let user = await prisma.user.findFirst({
            where: {
                email: email
            }
        });

        if (user) {
            return res.status(409).json({ error: 'El usuario ya existe' });
        }

        user = await prisma.user.create({
            data: {
                email: email,
                name: name,
                password: bcrypt.hashSync(password, 10)
            }
        });

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body

    try {
        let user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        if (!user) {
            return res.status(404).json({ error: 'El usuario no existe' });
        }

        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ error: 'La contraseña no es correcta' });
        }

        const token = jwt.sign({ id: user.id }, JWT_SECRET);

        res.json({ user, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}