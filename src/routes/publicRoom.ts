import { Hono } from 'hono'
import { publicShowRoom } from '../controllers/room/publicShowRoom'
import { publicShowAllFreeRooms } from '../controllers/room/publicShowAllFreeRooms'

const app = new Hono()

app.get('/all', async (c) => {
    const result = await publicShowAllFreeRooms(c)

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

app.get('/show/:roomNumber', async (c) => {
    const result = await publicShowRoom(c)

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

export default app
