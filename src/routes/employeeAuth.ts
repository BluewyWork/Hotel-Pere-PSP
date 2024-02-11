import { Hono } from 'hono'
import { Answer } from '../models/answer'
import { employeeLogin } from '../controllers/auth/employeeLogin'
import { employeeRegister } from '../controllers/auth/employeeRegister'

const app = new Hono()

app.post('/register', async (c) => {
    const result = await employeeRegister(c)

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

app.post('/login', async (c) => {
    const result: Answer = await employeeLogin(c)

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

export default app
