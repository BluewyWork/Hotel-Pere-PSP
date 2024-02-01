import { Hono } from 'hono'
import { customerLogin } from '../controllers/auth/client/login'
import { saveUser } from '../controllers/auth/client/register'

const app = new Hono()

app.post('/login', async (c) => {
    const result = await customerLogin(c)
    return c.json({ data: result.data, ok: result.ok }, result.status)
})

app.post('/register', async (c) => {
    const result = await saveUser(c)
    return c.json({ data: result.data, ok: result.ok }, result.status)
})

export default app
