import { Hono } from 'hono'
import { employeeShowBook } from '../controllers/book/employeeShowBook'
import { employeeShowAllBooks } from '../controllers/book/employeeShowAllBooks'
import { employeeUpdateBook } from '../controllers/book/employeeUpdateBook'

const app = new Hono()

app.get('/:id', async (c) => {
    const result = await employeeShowBook(c)

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

app.get('/', async (c) => {
    const result = await employeeShowAllBooks(c)

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

app.put('/:id', async (c) => {
    const result = await employeeUpdateBook(c)

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

export default app
