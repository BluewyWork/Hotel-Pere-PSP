import { Hono } from 'hono'
import { guestShowAllRooms } from '../controllers/room/guestShowAllRooms'
import { guestShowRoom } from '../controllers/room/guestShowRoom'
import { guestBookRoom } from '../controllers/book/guestBookRoom'

const app = new Hono()

app.get('/', async (c) => {
    const result = await guestShowAllRooms(c)

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

app.get('/:number', async (c) => {
    const result = await guestShowRoom(c, parseInt(c.req.param('number')))

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

export default app
