import mongoose from 'mongoose'
import { Answer } from '../../models/answer'
import { roomSchema } from '../../db/schemas/room'
import { Room } from '../../models/room'
import { Reservation } from '../../models/reservation'
import { reservationSchema } from '../../db/schemas/reservation'
import { oneMoreDay, parseDateWithMidnight } from '../../utils/dates'
import { guestSchema } from '../../db/schemas/guest'

export const employeeCreateReservation = async (c: any): Promise<Answer> => {
    const reservationData = await c.req.json()

    const userModel = mongoose.model('guests', guestSchema)
    const roomNumber = reservationData.roomNumber
    const RoomModel = mongoose.model<Room>('rooms', roomSchema)
    const ReservationModel = mongoose.model<Reservation>(
        'reservation',
        reservationSchema
    )
    const user = await userModel.findOne({ email: reservationData.guestEmail })

    if (!user) {
        return {
            data: 'Usuario no encontrado',
            status: 404,
            ok: false,
        }
    }
    console.log(reservationData)

    if (
        (user.email !== reservationData.guestEmail,
        user.surname !== reservationData.guestSurname,
        user.name !== reservationData.guestName)
    ) {
        return {
            data: 'Usuario no encontrado',
            status: 400,
            ok: false,
        }
    }

    if (isNaN(roomNumber)) {
        return {
            data: 'Unable to parse...',
            status: 400,
            ok: false,
        }
    }

    if (!reservationData) {
        return {
            data: 'Hmmm missing or invalid data',
            status: 400,
            ok: false,
        }
    }

    const reservationCheckIn = parseDateWithMidnight(
        oneMoreDay(reservationData.checkIn)
    )
    const reservationCheckOut = new Date(
        parseDateWithMidnight(oneMoreDay(reservationData.checkOut))
    )

    reservationData.reseved = true

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

        const reserve = {
            guestName: reservationData.guestName,
            guestSurname: reservationData.guestSurname,
            guestEmail: reservationData.guestEmail,
            roomNumber: reservationData.roomNumber,
            pricePerNight: room.pricePerNight,
            checkIn: reservationCheckIn,
            checkOut: reservationCheckOut,
        }

        const newReservation = await ReservationModel.create(reserve)

        await RoomModel.findOneAndUpdate(
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
            data: 'Reserva creada',
            status: 201,
            ok: true,
        }
    } catch (error) {
        console.error(error)
        return {
            data: 'No hemos podido procesar tu solicitud',

            status: 422,
            ok: false,
        }
    }
}
