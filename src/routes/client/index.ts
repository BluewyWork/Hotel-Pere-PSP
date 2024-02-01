import { Hono } from 'hono'
import { showClient } from '../../controllers/room/client/showClient'

const app = new Hono()

app.get('/', async (c) => {
    const result = await showClient(c)

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

export default app
