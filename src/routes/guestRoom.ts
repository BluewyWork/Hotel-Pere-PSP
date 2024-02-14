import { Hono } from 'hono'
import { guestShowAllFreeRooms } from '../controllers/room/guestShowAllFreeRooms'
import { guestShowRoom } from '../controllers/room/guestShowRoom'

const app = new Hono()

app.get('/all', async (c) => {
    const result = await guestShowAllFreeRooms(c)

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

app.get('/:number', async (c) => {
    const result = await guestShowRoom(c, parseInt(c.req.param('number')))

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

export default app
