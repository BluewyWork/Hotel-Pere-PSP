import mongoose from 'mongoose'
import { Answer } from '../../models/answer'
import { roomSchema } from '../../db/schemas/room'
import { Room } from '../../models/room'
import { Reservation } from '../../models/reservation'
import { guestSchema } from '../../db/schemas/guest'
import { reservationSchema } from '../../db/schemas/reservation'
import { ReservationDates as ReservationDates } from '../../models/reservationDates'
import { Guest } from '../../models/guest'

export const guestMakeReservation = async (
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

    const reservationDate = c.json as ReservationDates

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

        ReservationModel.create({
            _customerId: guest.id,
            guestName: guest.name,
            roomNumber: room?.number,
            pricePerNight: room.pricePerNight,
            checkIn: new Date(reservationDate.checkIn.setHours(16)),
            checkOut: new Date(reservationDate.checkOut.setHours(12)),
            reserved: true,
        })

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
