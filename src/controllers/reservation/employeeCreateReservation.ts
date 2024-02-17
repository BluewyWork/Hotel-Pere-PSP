import mongoose from 'mongoose'
import { Answer } from '../../models/answer'
import { roomSchema } from '../../db/schemas/room'
import { guestSchema } from '../../db/schemas/guest'
import { Room } from '../../models/room'
import { Guest } from '../../models/guest'
import { Reservation } from '../../models/reservation'
import { reservationSchema } from '../../db/schemas/reservation'
import { ReservationDates } from '../../models/reservationDates'
import { ReservationDateRange } from '../../models/room'

export const employeeCreateReservation = async (c: any): Promise<Answer> => {
    const RoomModel = mongoose.model<Room>('rooms', roomSchema)
    const ReservationModel = mongoose.model<Reservation>(
        'reservation',
        reservationSchema
    )

    const reservation = await c.req.json()
    const reservationCheckIn = new Date(reservation.checkIn)
    const reservationCheckOut = new Date(reservation.checkOut)

    try {
        const roomFree = await RoomModel.findOne({
            number: reservation.roomNumber,
            reservedDays: {
                $elemMatch: {
                    $and: [
                        {
                            $or: [
                                {
                                    checkIn: {
                                        $lt: reservationCheckIn,
                                    },
                                },
                                {
                                    checkOut: {
                                        $gt: reservationCheckOut,
                                    },
                                },
                            ],
                        },
                    ],
                },
            },
        })

        if (!roomFree) {
            return {
                data: 'Room not exist',
                status: 404,
                ok: false,
            }
        }
        const reservationDateRange = {
            _reservationId: reservation._id,
            checkIn: reservationCheckIn,
            checkOut: reservationCheckOut,
        }

        await RoomModel.updateOne(
            { _id: roomFree._id },
            { $push: { reservedDays: reservationDateRange } }
        )
        await ReservationModel.create({
            guestName: reservation.guestName,
            guestSurname: reservation.guestSurname,
            guestEmail: reservation.guestEmail,
            roomNumber: reservation.roomNumber,
            pricePerNight: reservation.pricePerNight,
            checkIn: reservationCheckIn,
            checkOut: reservationCheckOut,
            creationDate: new Date(),
        })

        //roomFree.save()

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
