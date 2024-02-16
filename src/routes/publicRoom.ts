import { Hono } from 'hono'
import { guestShowAllFreeRooms } from '../controllers/room/guestShowAllFreeRooms'

const app = new Hono()

app.get('/all', async (c) => {
    const result = await guestShowAllFreeRooms(c)

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

export default app
