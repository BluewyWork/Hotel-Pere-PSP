import { Hono } from 'hono'
import { Answer } from '../models/answer'
import { saveUser } from '../controllers/auth/client/register'
import { login } from '../controllers/auth/employee/login'

const app = new Hono()

app.post('/register', async (c) => {
    const result = await saveUser(c)

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

app.post('/login', async (c) => {
    const result: Answer = await login(c)

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

export default app
