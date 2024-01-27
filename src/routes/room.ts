import { Hono } from 'hono'
import { Answer } from '../models/answer'
import { saveRoom } from '../controllers/room/admin/room'

const app = new Hono()

app.post('/insert', async (c) => {
    const result = await saveRoom(c)
    return c.json({ data: result.data, ok: result.ok }, result.status)
})

export default app
