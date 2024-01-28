import { Hono } from 'hono'
import { showRooms } from '../../controllers/room/client/showRooms'
import { showRoom } from '../../controllers/room/client/showRoom'
import { bookRoom } from '../../controllers/room/client/bookRoom'

const app = new Hono()

app.get('/', async (c) => {
    const result = await showRooms(c)

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

app.get('/:number', async (c) => {
    const result = await showRoom(parseInt(c.req.param('number')))

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

app.put('/:number', async (c) => {
    const result = await bookRoom(parseInt(c.req.param('number')))

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

export default app
