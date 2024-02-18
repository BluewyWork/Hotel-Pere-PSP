import { Hono } from 'hono'
import { adminDeleteEmployee } from '../controllers/employee/adminDeleteEmployee'
import { adminCreateEmployee } from '../controllers/employee/adminCreateEmployee'
import { adminUpdateEmployee } from '../controllers/employee/adminUpdateEmployee'

const app = new Hono()

app.post('/create', async (c) => {
    const result = await adminCreateEmployee(c)

    return c.json({ data: result.data, ok: result.ok }, result.status)
})
app.put('/update', async (c) => {
    const result = await adminUpdateEmployee(c)

    return c.json({ data: result.data, ok: result.ok }, result.status)
})
app.delete('/delete', async (c) => {
    const result = await adminDeleteEmployee(c)

    return c.json({ data: result.data, ok: result.ok }, result.status)
})
export default app
