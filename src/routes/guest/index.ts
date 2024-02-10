import { Hono } from 'hono'
import { showOneGuest } from '../../controllers/guest/guest/showOneGuest'
import { showMyself } from '../../controllers/guest/guest/showMyself'
import { auth } from '../../middleware/auth'

const app = new Hono()

app.get('/', async (c) => {
    const result = await showOneGuest(c)

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

app.use('/me', auth)
app.get('/me', async (c) => {
    const result = await showMyself(c)

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

export default app
