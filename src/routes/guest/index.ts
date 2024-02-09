import { Hono } from 'hono'
import { showGuest } from '../../controllers/guest/guest/showOneGuest'

const app = new Hono()

app.get('/', async (c) => {
    const result = await showGuest(c)

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

export default app
