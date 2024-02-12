import { Hono } from 'hono'
import { guestShowMyself } from '../controllers/table/guestShowMyself'
import { authMiddleware } from '../middleware/authMiddleware'
import { updateGuest } from '../controllers/table/guestUpdate'
import { deleteGuest } from '../controllers/table/guestDelete'

const app = new Hono()

//Esta ruta no empieza por api debido a que se le aplica otro middleware diferent de auth
// que es mediante headers
// La ruta para testear:
//http://localhost:8000/guest/me (GET)

app.use('/me', authMiddleware)
app.get('/me', async (c) => {
    const result = await guestShowMyself(c)

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

app.put('/,', async (c) => {
    const result = await updateGuest(c)

    return c.json({ data: result.data, ok: result.ok }, result.status)
})
app.delete('/', async (c) => {
    const result = await deleteGuest(c)

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

export default app
