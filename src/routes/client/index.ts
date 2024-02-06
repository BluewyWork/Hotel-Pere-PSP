import { Hono } from 'hono'
import { showClient } from '../../controllers/customer/customer/showCustomer'

const app = new Hono()

app.get('/', async (c) => {
    const result = await showClient(c)

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

export default app
