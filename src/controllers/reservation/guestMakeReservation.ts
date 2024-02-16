import mongoose from 'mongoose'
import { Answer } from '../../models/answer'
import { roomSchema } from '../../db/schemas/room'
import { Room } from '../../models/room'
import { Reservation } from '../../models/reservation'
import { guestSchema } from '../../db/schemas/guest'
import { reservationSchema } from '../../db/schemas/reservation'
import { ReservationDates as ReservationDates } from '../../models/reservationDates'
import { Guest } from '../../models/guest'

// TODO: fix reservation duplicates
export const guestMakeReservation = async (c: any): Promise<Answer> => {
    const payload = c.get('jwtPayload')
    console.log(payload)

    const roomNumber = parseInt(c.req.param('roomNumber'))

    if (isNaN(roomNumber)) {
        return {
            data: 'Unable to parse...',
            status: 400,
            ok: false,
        }
    }

    const RoomModel = mongoose.model<Room>('rooms', roomSchema)
    const GuestModel = mongoose.model<Guest>('guests', guestSchema)
    const ReservationModel = mongoose.model<Reservation>(
        'reservation',
        reservationSchema
    )

    const reservationDate = (await c.req.json()) as ReservationDates

    if (!reservationDate) {
        return {
            data: 'Hmmm missing or invalid data',
            status: 400,
            ok: false,
        }
    }

    const roomFree = await RoomModel.findOne({
        number: roomNumber,
        reservedDays: {
            $not: {
                $gte: reservationDate.checkIn,
                $lte: reservationDate.checkOut,
            },
        },
    })

    if (!roomFree) {
        return { data: 'Reserva no disponible', status: 400, ok: false }
    }

    try {
        const queriedRoom = await RoomModel.findOne({ number: roomNumber })

        if (!queriedRoom) {
            return {
                data: 'Room not exist',
                status: 404,
                ok: false,
            }
        }

        const queriedGuest = await GuestModel.findOne({ email: payload.email })

        if (!queriedGuest) {
            return {
                data: 'User not exist',
                status: 404,
                ok: false,
            }
        }

        const checkIn = new Date(reservationDate.checkIn)
        // checkIn.setHours(16)

        const checkOut = new Date(reservationDate.checkOut)
        // checkOut.setHours(12)

        await ReservationModel.create({
            guestName: queriedGuest.name,
            guestSurname: queriedGuest.surname,
            guestEmail: queriedGuest.email,
            roomNumber: queriedRoom.number,
            pricePerNight: queriedRoom.pricePerNight,
            checkIn: checkIn,
            checkOut: checkOut,
            creationDate: new Date(),
            reserved: true,
        })

        // roomFree.reservedDays = roomFree.reservedDays.filter((x) => {
        //     return (
        //         reservationDate.checkIn !== x && reservationDate.checkOut !== x
        //     )
        // })

        roomFree.reservedDays.forEach((e) => {
            e._reservationId
        })

        roomFree.reservedDays.push(R)
        roomFree.reservedDays.roomFree.reservedDays.push(checkIn)
        roomFree.reservedDays.push(checkOut)
        roomFree.save()

        return {
            data: 'Reserva realizada correctamente',
            status: 201,
            ok: true,
        }
    } catch (error) {
        return {
            data: 'ERROR: ' + error,
            status: 422,
            ok: false,
        }
    }
}
