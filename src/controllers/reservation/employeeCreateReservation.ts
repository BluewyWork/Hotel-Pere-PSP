import mongoose from 'mongoose'
import { Answer } from '../../models/answer'
import { roomSchema } from '../../db/schemas/room'
import { Room } from '../../models/room'
import { Reservation } from '../../models/reservation'
import { reservationSchema } from '../../db/schemas/reservation'

export const employeeCreateReservation = async (c: any): Promise<Answer> => {
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

    console.log(reservationData);
    

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

        const validateReservation = await ReservationModel.find({
            roomNumber: roomNumber,
            $or: [
                {
                    checkIn: {
                        $lte: reservationCheckIn,
                    },
                    checkOut: {
                        $gte: reservationCheckOut,
                    },
                },
                {
                    checkIn: {
                        $gte: reservationCheckIn,
                    },
                    checkOut: {
                        $lte: reservationCheckOut,
                    },
                },
                {
                    checkIn: {
                        $lte: reservationCheckIn,
                    },
                    checkOut: {
                        $gte: reservationCheckOut,
                    },
                },
            ],
        })

        if (validateReservation.length > 0) {
            return {
                data: 'Reserva no disponible',
                status: 409,
                ok: false,
            }
        }

        if (!room) {
            return { data: 'Reserva no disponible', status: 409, ok: false }
        }

        const reserve = {
            guestName: reservationData.name,
            guestSurname: reservationData.surname,
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
            data: room,
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
