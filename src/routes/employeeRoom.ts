import { Hono } from 'hono'
import { employeeSaveRoom } from '../controllers/room/employeeSaveRoom'
import { employeeDeleteRoom } from '../controllers/room/employeeDeleteRoom'
import { employeeUpdateRoom } from '../controllers/room/employeeUpdateRoom'
import { employeeShowFilteredRooms } from '../controllers/room/employeeShowFilteredRooms'
import { employeeShowAllRooms } from '../controllers/room/employeeShowAllRooms'

const app = new Hono()

app.post('/new', async (c) => {
    const result = await employeeSaveRoom(c)

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

app.delete('/delete/:number', async (c) => {
    console.log(c.req.param('number'))
    const result = await employeeDeleteRoom(parseInt(c.req.param('number')))

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

app.put('/update', async (c) => {
    const result = await employeeUpdateRoom(c)

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

app.get('/search', async (c) => {
    const reserved = c.req.queries('reserved')
    const bed = c.req.queries('bed')
    const price = c.req.queries('price')
    console.log('bed: ' + bed + ' reserved: ' + reserved + ' price: ' + price)
    const result = await employeeShowFilteredRooms(price, bed, reserved)
    return c.json({ data: result.data, ok: result.ok }, result.status)
})

app.get('/all', async (c) => {
    const result = await employeeShowAllRooms(c)

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

export default app
