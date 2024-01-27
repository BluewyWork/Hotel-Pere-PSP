import { Hono } from 'hono'
import { customerLogin } from '../controllers/customer/login'

const app = new Hono()

app.get('/login', async (c) => {
    const result = await customerLogin(c)
    return c.json({ data: result.data, ok: result.ok }, result.status)
})

export default app
