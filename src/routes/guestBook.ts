import { Hono } from 'hono'
import { guestBookRoom } from '../controllers/book/guestBookRoom'

const app = new Hono()

app.put('/book/:number', async (c) => {
    const result = await guestBookRoom(c, parseInt(c.req.param('number')))

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

app.put('/cancel/:number', async (c) => {
    // arreglar control de cancelacion
    const result = await guestBookRoom(c, parseInt(c.req.param('number')))

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

export default app
