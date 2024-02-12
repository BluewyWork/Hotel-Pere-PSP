import { Hono } from 'hono'
import { guestShowRoomsDate } from '../controllers/room/guestShowRoomsDate'
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

app.get('/search', async (c) => {
    var result = {
        data: '',
        ok: false,
        status: 505,
    }
    const checkIn = c.req.query('checkIn')
    const checkOut = c.req.query('checkOut')
    if (checkIn && checkOut) {
        result = await guestShowRoomsDate(checkIn, checkOut)
    }
    return c.json({ data: result.data, ok: result.ok }, result.status)
})

export default app
