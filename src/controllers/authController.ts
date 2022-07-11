import { Request, Response } from 'express'
import { userService } from '../services/userService'
import { jwtService } from '../services/jwtService'
import bcrypt from 'bcrypt'
import { Resource } from '@adminjs/sequelize'
import { User } from '../models'

export const authController = {

    register: async (req: Request, res: Response) => {
        const { name, surname, email, password } = req.body

        try {
            const userAlreadyExists = await userService.findByEmail(email)

            if (userAlreadyExists) {
                throw new Error('This e-mail already exists on our database')
            }

            const user = await userService.create({
                name,
                surname,
                email,
                password,
                role: 'user',
            })

            return res.status(201).json(user)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    },
    login: async (req: Request, res: Response) => {
        const { email, password } = req.body

        try {
            const user = await userService.findByEmail(email)

            if (!user) {
                return res.status(401).json({ message: 'This e-mail is not registered' })
            }


            user.checkPassword(password, (err, isSame) => {
                if (err) {
                    return res.status(400).json({ message: err.message })
                }

                if (!isSame) {
                    return res.status(401).json({ message: 'Password is incorrect' })
                }

                const payload = {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }

                const token = jwtService.getToken(payload, '7d')

                return res.json({ authenticated: true, user, token })
            })
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message })
            }
        }
    },

    get: async (req: Request, res: Response) => {
        const { email } = req.params
        const obj = await User.findOne({
            attributes: [
                'id',
            ], 
            where: {email}
        })
        return res.status(201).json(obj?.id)
    }
}
