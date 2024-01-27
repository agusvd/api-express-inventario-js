import { prisma } from '../db.js'
import bcrypt from 'bcrypt'



export const signup = async (req, res) => {
    const { email, name , password } = req.body

    if (!password) {
        return res.status(400).json({ error: 'La contraseña es obligatoria' });
    }

    let user = await prisma.user.findFirst({
        where: {
            email: email
        }
    })
    if (user) {
        throw new Error('El usuario ya existe')
    }
    user = await prisma.user.create({
        data: {
            email: email,
            name: name,
            password: bcrypt.hashSync(password, 10)
        }
    })
    res.json(user)
}