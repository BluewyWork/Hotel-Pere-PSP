import { Hono } from 'hono'
import { saveRoom } from '../controllers/room/admin/saveRoom'
import { deleteRoom } from '../controllers/room/admin/deleteRoom'
import { updateRoom } from '../controllers/room/admin/updateRoom'
import { showRoom } from '../controllers/room/admin/showRoom'
import { showRooms } from '../controllers/room/admin/showRooms'

const app = new Hono()

app.post('/', async (c) => {
    const result = await saveRoom(c)

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

app.delete('/:number', async (c) => {
    console.log(c.req.param('number'))
    const result = await deleteRoom(parseInt(c.req.param('number')))

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

app.put('/', async (c) => {
    const result = await updateRoom(c)

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

app.get('/search', async (c) => {
    const reserved = c.req.queries('reserved')
    const bed = c.req.queries('bed')
    const price = c.req.queries('price')
    const result = await showRoom(price, bed, reserved)
    return c.json({ data: result.data, ok: result.ok }, result.status)
})

app.get('/', async (c) => {
    const result = await showRooms(c)

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

export default app
