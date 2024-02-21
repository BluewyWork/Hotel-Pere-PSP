import { Hono } from 'hono'
import { adminDeleteEmployee } from '../controllers/employee/adminDeleteEmployee'
import { adminCreateEmployee } from '../controllers/employee/adminCreateEmployee'
import { adminUpdateEmployee } from '../controllers/employee/adminUpdateEmployee'
import { adminShowEmoloyee } from '../controllers/employee/adminShowEmployee'

const app = new Hono()
app.get('/', async (c) => {
    const result = await adminShowEmoloyee(c)

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

app.post('/', async (c) => {
    const result = await adminCreateEmployee(c)

    return c.json({ data: result.data, ok: result.ok }, result.status)
})
app.put('/', async (c) => {
    const result = await adminUpdateEmployee(c)

    return c.json({ data: result.data, ok: result.ok }, result.status)
})
app.delete('/:email', async (c) => {
    const result = await adminDeleteEmployee(c)

    return c.json({ data: result.data, ok: result.ok }, result.status)
})
export default app
