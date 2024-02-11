import { Hono } from 'hono'
import { bookRoom } from '../controllers/room/guest/bookRoom'

const app = new Hono()

app.put('/book/:number', async (c) => {
    const result = await bookRoom(c, parseInt(c.req.param('number')))

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

app.put('/cancel/:number', async (c) => {
    // arreglar control de cancelacion
    const result = await bookRoom(c, parseInt(c.req.param('number')))

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

export default app
