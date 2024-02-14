import { Hono } from 'hono'
import { guestShowFilteredbyDateRooms } from '../controllers/room/guestShowFilteredByDateRooms'
import { guestMakeReservation } from '../controllers/reservation/guestMakeReservation'
import { guestCancelReservation } from '../controllers/reservation/guestCancelReservation'

const app = new Hono()

app.put('/book/:number', async (c) => {
    const result = await guestMakeReservation(
        c,
        parseInt(c.req.param('number'))
    )

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

app.delete('/cancel/', async (c) => {
    const result = await guestCancelReservation(c)
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