import { Hono } from 'hono'
import { Answer } from '../models/answer'
import { getOneRoom, saveRoom, getAllConfirmed } from '../controllers/room/room'
import { deleteRoom } from '../controllers/room/room'
import { updateRoom } from '../controllers/room/room'
import { number } from 'zod'

const app = new Hono()

app.post('/insert', async (c) => {
    const result = await saveRoom(c)
    return c.json({ data: result.data, ok: result.ok }, result.status)
})

app.delete('/deleteOne/:number',async (c) => {
    console.log(c.req.param('number'));
    const result = await deleteRoom(parseInt(c.req.param('number')))
    return c.json({ data: result.data, ok: result.ok }, result.status)
    
})

app.put('/updateOne/:number',async (c) => {
    const result = await updateRoom(c, parseInt(c.req.param('number')))
    return c.json({ data: result.data, ok: result.ok }, result.status)
})

app.get('/getOne/:number',async (c) => {
    const result = await getOneRoom(parseInt(c.req.param('number')))
    return c.json({ data: result.data, ok: result.ok }, result.status)
})

app.get('/getAllConfirmed/:confirmed',async (c) => {
    const result = await getAllConfirmed(c.req.param('confirmed'))
    return c.json({ data: result.data, ok: result.ok }, result.status)
})
app.get('/getAllCancelled/:cancelled',async (c) => {
    const result = await getAllConfirmed(c.req.param('cancelled'))
    return c.json({ data: result.data, ok: result.ok }, result.status)
})
export default app