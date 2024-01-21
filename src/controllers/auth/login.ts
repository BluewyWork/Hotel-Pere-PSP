import { Answer } from '../../models/answer'
import { User } from '../../models/user'
import { hashPassword, verfifyPassword } from '../../utils/auth'
import { ValidateUserLogin } from '../../validators/auth'
import { sign } from 'hono/jwt'
import { setCookie } from 'hono/cookie'

export const login = async (c: any): Promise<Answer> => {
    const invalidCredentials: Answer = {
        data: 'Invalid Credentials',
        status: 401,
        ok: false,
    }
    const user = (await c.req.json()) as User

    const validateUser = ValidateUserLogin.safeParse(user)

    if (!validateUser.success) {
        return {
            data: validateUser.error.message,
            status: 422,
            ok: false,
        }
    }

    try {
        const selectUser: User = {
            name: 'test',
            email: 'test@gmail.com',
            password: await hashPassword('test'),
        }

        if (!selectUser) {
            return invalidCredentials
        }

        const verifyPassword = await verfifyPassword(
            user.password,
            selectUser.password
        )
        if (!verifyPassword) {
            return invalidCredentials
        }

        setCookie(c, 'jwt', await sign(selectUser.email, 'test'), {
            sameSite: 'Lax',
            path: '/',
        })

        return {
            data: 'Inicio de sesion correcto',
            status: 200,
            ok: true,
        }
    } catch (error) {
        return {
            data: 'error',
            status: 422,
            ok: false,
        }
    }
}
