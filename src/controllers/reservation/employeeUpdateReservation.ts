import mongoose from 'mongoose'
import { reservationSchema } from '../../db/schemas/reservation'
import { Answer } from '../../models/answer'
import { Reservation } from '../../models/reservation'
import { Room } from '../../models/room'
import { roomSchema } from '../../db/schemas/room'

export const employeeUpdateReservation = async (
    c: any,
    id: string
): Promise<Answer> => {
    const objectId = new mongoose.Types.ObjectId(id)
    const RoomModel = mongoose.model<Room>('rooms', roomSchema)
    const ReservationModel = mongoose.model<Reservation>(
        'reservations',
        reservationSchema
    )
    const reservationUpdated = (await c.req.json()) as Reservation

    try {
        const reservationMongo = await ReservationModel.findOne({
            _id: objectId,
        })
        if (!reservationMongo) {
            return {
                data: 'Reserva no encontrada',
                status: 404,
                ok: false,
            }
        }

        const roomFree = await RoomModel.findOne({
            number: reservationMongo.roomNumber,
            reservedDays: {
                $not: {
                    $elemMatch: {
                        $and: [
                            { checkIn: { $lt: reservationUpdated.checkOut } },
                            { checkOut: { $gt: reservationUpdated.checkIn } },
                            { _reservationId: { $ne: reservationMongo._id } },
                        ],
                    },
                },
            },
        })

        if (!roomFree) {
            return { data: 'Reserva no disponible', status: 400, ok: false }
        }

        reservationMongo.checkIn = new Date(reservationUpdated.checkIn)
        reservationMongo.checkOut = new Date(reservationUpdated.checkOut)

        reservationMongo.save()

        for (let i = 0; i < roomFree.reservedDays.length; i++) {
            const reservation = roomFree.reservedDays[i]._reservationId
            if (reservation.equals(reservationMongo._id)) {
                roomFree.reservedDays[i].checkIn = reservationMongo.checkIn
                roomFree.reservedDays[i].checkOut = reservationMongo.checkOut
            }
        }

        roomFree.save()

        return { data: 'Reserva actualizada', status: 200, ok: true }
    } catch (error) {
        return {
            data: 'Error al procesar la solicitud',
            status: 422,
            ok: false,
        }
    }
}
