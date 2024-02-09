import { Hono } from 'hono'
import { showOneGuest } from '../../controllers/guest/guest/showOneGuest'

const app = new Hono()

app.get('/', async (c) => {
    const result = await showOneGuest(c)

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

export default app
