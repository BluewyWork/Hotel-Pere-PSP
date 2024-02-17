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
    const payload = c.get('jwtPayload')
    console.log(payload)


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


    const roomFree = await RoomModel.findOne({
        number: roomNumber,
        reservedDays: {
            $not: {
                $elemMatch: {
                    checkIn: {
                        $gte: reservationDate.checkIn,
                    },
                    checkOut: {
                        $lte: reservationDate.checkOut,
                    },
                },
            },
        },
    })

    if (!roomFree) {
        return { data: 'Reserva no disponible', status: 400, ok: false }
    }

    try {
        const room = await RoomModel.findOne({
            number: reservationData.roomNumber,
            reservedDays: {
                $elemMatch: {
                    $or: [
                        {
                            checkIn: { $lt: reservationCheckOut },
                            checkOut: { $gt: reservationCheckIn },
                        },
                        {
                            checkIn: {
                                $gte: reservationCheckIn,
                                $lt: reservationCheckOut,
                            },
                        },
                        {
                            checkOut: {
                                $gt: reservationCheckIn,
                                $lte: reservationCheckOut,
                            },
                        },
                    ],
                },
            },
        })

        if (room) {
            return {
                data: 'La habitación no está disponible para las fechas seleccionadas',
                status: 409,
                ok: false,
            }
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
