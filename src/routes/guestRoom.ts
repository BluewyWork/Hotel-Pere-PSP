import { Hono } from 'hono'
import { guestShowAllFreeRooms } from '../controllers/room/guestShowAllFreeRooms'
import { guestShowRoom } from '../controllers/room/guestShowRoom'

const app = new Hono()

app.get('/show/:roomNumber', async (c) => {
    const result = await guestShowRoom(c)

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

export default app
