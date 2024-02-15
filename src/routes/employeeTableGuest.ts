import { Hono } from 'hono'
import { employeeShowAllGuests } from '../controllers/tableGuest/employeeShowAllGuests'

const app = new Hono()

app.get('/all', async (c) => {
    const result = await employeeShowAllGuests(c)

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

export default app
