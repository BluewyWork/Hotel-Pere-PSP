import { Hono } from 'hono'
import { employeeShowFilteredReservations } from '../controllers/reservation/employeeShowFilteredReservations'
import { employeeShowAllReservations } from '../controllers/reservation/employeeShowAllReservations'
import { employeeUpdateReservation } from '../controllers/reservation/employeeUpdateReservation'
import { employeeCancelReservation } from '../controllers/reservation/employeeCancelReservation'
import { employeeCreateReservation } from '../controllers/reservation/employeeCreateReservation'

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
    const result = await employeeUpdateReservation(c, c.req.param('id'))
    return c.json({ data: result.data, ok: result.ok }, result.status)
})
app.delete('/delete/:id', async (c) => {
    const result = await employeeCancelReservation(c, c.req.param('id'))

    return c.json({ data: result.data, ok: result.ok }, result.status)
})
app.post('/create', async (c) => {
    const result = await employeeCreateReservation(c)
    return c.json({ data: result.data, ok: result.ok }, result.status)
})
export default app
