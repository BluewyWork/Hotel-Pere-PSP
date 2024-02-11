import { Hono } from 'hono'
import { employeeSaveRoom } from '../controllers/room/employeeSaveRoom'
import { employeeDeleteRoom } from '../controllers/room/employeeDeleteRoom'
import { employeeUpdateRoom } from '../controllers/room/employeeUpdateRoom'
import { employeeShowRoom } from '../controllers/room/employeeShowRoom'
import { employeeShowAllRooms } from '../controllers/room/employeeShowAllRooms'

const app = new Hono()

app.post('/', async (c) => {
    const result = await employeeSaveRoom(c)

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

app.delete('/:number', async (c) => {
    console.log(c.req.param('number'))
    const result = await employeeDeleteRoom(parseInt(c.req.param('number')))

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

app.put('/', async (c) => {
    const result = await employeeUpdateRoom(c)

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

app.get('/search', async (c) => {
    const reserved = c.req.queries('reserved')
    const bed = c.req.queries('bed')
    const price = c.req.queries('price')
    const result = await employeeShowRoom(price, bed, reserved)
    return c.json({ data: result.data, ok: result.ok }, result.status)
})

app.get('/', async (c) => {
    const result = await employeeShowAllRooms(c)

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

export default app
