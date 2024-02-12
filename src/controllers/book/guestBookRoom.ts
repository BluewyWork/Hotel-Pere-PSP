import mongoose from 'mongoose'
import { Answer } from '../../models/answer'
import { roomSchema } from '../../db/schemas/room'
import { Room } from '../../models/room'
import { Reservation } from '../../models/reservation'
import { guestSchema } from '../../db/schemas/guest'
import { reservationSchema } from '../../db/schemas/reservation'
import { BookDates } from '../../models/bookDates'
import { Guest } from '../../models/guest'

export const guestBookRoom = async (
    c: any,
    roomNumber: number
): Promise<Answer> => {
    const RoomModel = mongoose.model<Room>('rooms', roomSchema)
    const GuestModel = mongoose.model<Guest>('guests', guestSchema)
    const ReservationModel = mongoose.model<Reservation>(
        'reservation',
        reservationSchema
    )

    const payload = c.get('jwtPayload')

    const bookDate = c.json as BookDates

    try {
        const room = await RoomModel.findOne({ number: roomNumber })
        const guest = await GuestModel.findOne({ email: payload.email })

        if (!room) {
            return {
                data: 'Room not exist',
                status: 404,
                ok: false,
            }
        }

        if (!guest) {
            return {
                data: 'User not exist',
                status: 404,
                ok: false,
            }
        }

        const booking: Reservation = {
            guestId: guest.id,
            roomNumber: room?.number,
            roomPrice: room.pricePerNight,
            checkIn: bookDate.checkIn,
            checkOut: bookDate.checkOut,
            status: true,
        }

        ReservationModel.create(booking)
        RoomModel.updateOne(
            { number: roomNumber },
            { $set: { reserved: true } }
        )

        return {
            data: 'Reservada realizada correctamente',
            status: 201,
            ok: true,
        }
    } catch (error) {
        return {
            data: 'Error al procesar la solicitud',
            status: 422,
            ok: false,
        }
    }
}
