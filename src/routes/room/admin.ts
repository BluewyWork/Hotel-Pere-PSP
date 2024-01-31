import { Hono } from 'hono'
import { saveRoom } from '../../controllers/room/admin/saveRoom'
import { deleteRoom } from '../../controllers/room/admin/deleteRoom'
import { updateRoom } from '../../controllers/room/admin/updateRoom'
import { showRoom } from '../../controllers/room/admin/showRoom'
import { showRooms } from '../../controllers/room/admin/showRooms'

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

app.get('/:number', async (c) => {
    const result = await showRoom(parseInt(c.req.param('number')))

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

app.get('/', async (c) => {
    const result = await showRooms(c)

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

// app.get('/getAllConfirmed/:confirmed', async (c) => {
//     const result = await getAllConfirmed(c.req.param('confirmed'))
//     return c.json({ data: result.data, ok: result.ok }, result.status)
// })
// app.get('/getAllCancelled/:cancelled', async (c) => {
//     const result = await getAllConfirmed(c.req.param('cancelled'))
//     return c.json({ data: result.data, ok: result.ok }, result.status)
// })
export default app
