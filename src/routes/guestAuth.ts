import { Hono } from 'hono'
import { guestLogin } from '../controllers/auth/guestLogin'
import { guestRegister } from '../controllers/auth/guestRegister'

const app = new Hono()

app.post('/login', async (c) => {
    const result = await guestLogin(c)
    return c.json({ data: result.data, ok: result.ok }, result.status)
})

app.post('/register', async (c) => {
    const result = await guestRegister(c)
    return c.json({ data: result.data, ok: result.ok }, result.status)
})

export default app
