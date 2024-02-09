import { Context } from 'hono'
import { verify } from 'hono/jwt'

export async function authMiddleware(c: Context, next: Function) {
    const token = c.req.header('Authorization')?.split(' ')[1] ?? null

    if (!token) {
        return c.json({ error: 'payasso' }, 401)
    }

    const payload = await verify(token, process.env.JWT_SECRET)

    if (!payload) {
        return c.json({ error: 'payasso' }, 401)
    }

    c.set('user', payload)
    return await next()
}
