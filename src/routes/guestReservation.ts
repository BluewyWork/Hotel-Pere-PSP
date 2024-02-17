import { Hono } from 'hono'
import { guestShowFilteredbyDateRooms } from '../controllers/room/guestShowFilteredByDateRooms'
import { guestMakeReservation } from '../controllers/reservation/guestMakeReservation'
import { guestCancelReservation } from '../controllers/reservation/guestCancelReservation'
import { guestShowReservations } from '../controllers/reservation/guestShowReservations'

const app = new Hono()

app.put('/new/:roomNumber', async (c) => {
    const result = await guestMakeReservation(c)

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

app.delete('/cancel/:id', async (c) => {
    const result = await guestCancelReservation(c, c.req.param('id'))

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

app.get('/all', async (c) => {
    const result = await guestShowReservations(c)

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

app.get('/search', async (c) => {
    var result = {
        data: '',
        ok: false,
        status: 505,
    }

    const checkIn = c.req.query('checkIn')
    const checkOut = c.req.query('checkOut')

    if (checkIn && checkOut) {
        result = await guestShowFilteredbyDateRooms(checkIn, checkOut)
    }

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

export default app
