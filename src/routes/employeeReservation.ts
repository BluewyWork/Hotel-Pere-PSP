import { Hono } from 'hono'
import { employeeShowFilteredReservations } from '../controllers/reservation/employeeShowFilteredReservations'
import { employeeShowAllReservations } from '../controllers/reservation/employeeShowAllReservations'
import { employeeUpdateReservation } from '../controllers/reservation/employeeUpdateReservation'

const app = new Hono()

app.get('/search', async (c) => {
    const result = await employeeShowFilteredReservations(c)

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

app.get('/all', async (c) => {
    const result = await employeeShowAllReservations(c)

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

app.put('/update/:id', async (c) => {
    const result = await employeeUpdateReservation(c)

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

export default app
