import { Hono } from 'hono'
import { showBook } from '../controllers/books/employee/showBook'
import { showBooks } from '../controllers/books/employee/showBooks'
import { updateBook } from '../controllers/books/employee/updateBook'

const app = new Hono()

app.get('/:id', async (c) => {
    const result = await showBook(c)

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

app.get('/', async (c) => {
    const result = await showBooks(c)

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

app.put('/:id', async (c) => {
    const result = await updateBook(c)

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

export default app
