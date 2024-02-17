import mongoose from 'mongoose'
import { Answer } from '../../models/answer'
import { roomSchema } from '../../db/schemas/room'
import { Room } from '../../models/room'
import { Reservation } from '../../models/reservation'
import { reservationSchema } from '../../db/schemas/reservation'

export const guestMakeReservation = async (c: any): Promise<Answer> => {
    const payload = c.get('jwtPayload')
    console.log(payload)

    const reservationDate = await c.req.json()

    const roomNumber = reservationDate.roomNumber

    if (isNaN(roomNumber)) {
        return {
            data: 'Unable to parse...',
            status: 400,
            ok: false,
        }
    }

    const RoomModel = mongoose.model<Room>('rooms', roomSchema)
    const ReservationModel = mongoose.model<Reservation>(
        'reservation',
        reservationSchema
    )

    if (!reservationDate) {
        return {
            data: 'Hmmm missing or invalid data',
            status: 400,
            ok: false,
        }
    }

    const reservationData = await c.req.json()
    const reservationCheckIn = new Date(reservationData.checkIn)
    const reservationCheckOut = new Date(reservationData.checkOut)

    try {
        const room = await RoomModel.findOne({
            number: roomNumber,
            $or: [
                {
                    reservedDays: {
                        $not: {
                            $elemMatch: {
                                checkIn: {
                                    $lte: reservationCheckIn,
                                },
                                checkOut: {
                                    $gte: reservationCheckOut,
                                },
                            },
                        },
                    },
                },
                { reservedDays: { $exists: false } },
            ],
        })

        if (!room) {
            return { data: 'Reserva no disponible', status: 409, ok: false }
        }

        const newReservation = await ReservationModel.create({
            guestName: payload.name,
            guestSurname: payload.surname,
            guestEmail: payload.email,
            roomNumber: reservationData.roomNumber,
            pricePerNight: reservationData.pricePerNight,
            checkIn: reservationCheckIn,
            checkOut: reservationCheckOut,
            creationDate: new Date(),
        })

        await RoomModel.updateOne(
            { number: reservationData.roomNumber },
            {
                $push: {
                    reservedDays: {
                        _reservationId: newReservation._id,
                        checkIn: reservationCheckIn,
                        checkOut: reservationCheckOut,
                    },
                },
            }
        )

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
