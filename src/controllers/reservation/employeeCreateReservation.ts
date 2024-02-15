import mongoose from 'mongoose'
import { Answer } from '../../models/answer'
import { roomSchema } from '../../db/schemas/room'
import { guestSchema } from '../../db/schemas/guest'
import { Room } from '../../models/room'
import { Guest } from '../../models/guest'
import { Reservation } from '../../models/reservation'
import { reservationSchema } from '../../db/schemas/reservation'
import { ReservationDates } from '../../models/reservationDates'

export const employeeCreateReservation = async (
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

    const reservationDate = (await c.req.json()) as ReservationDates

    try {
        const room = await RoomModel.findOne({ number: roomNumber })
        const guest = await GuestModel.findOne({ email: 'superman@gmail.com' })

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

        const checkIn = new Date(reservationDate.checkIn)
        checkIn.setHours(16)

        const checkOut = new Date(reservationDate.checkOut)
        checkOut.setHours(12)

        await ReservationModel.create({
            guestName: guest.name,
            guestSurname: guest.surname,
            guestEmail: guest.email,
            roomNumber: room.number,
            pricePerNight: room.pricePerNight,
            checkIn: checkIn,
            checkOut: checkOut,
            creationDate: new Date(),
            reserved: true,
        })

        return {
            data: 'Reserva realizada correctamente',
            status: 201,
            ok: true,
        }
    } catch (error) {
        console.error(error)
        return {
            data: 'Error al procesar la solicitud',
            status: 422,
            ok: false,
        }
    }
}
