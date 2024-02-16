import mongoose from 'mongoose'
import { reservationSchema } from '../../db/schemas/reservation'
import { Answer } from '../../models/answer'
import { Reservation } from '../../models/reservation'
import { Room } from '../../models/room'
import { roomSchema } from '../../db/schemas/room'
import { array, number } from 'zod'

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
                $gte: reservationUpdated.checkIn,
                $lte: reservationUpdated.checkOut,
            },
        })

        if (!roomFree) {
            return { data: 'Reserva no disponible', status: 400, ok: false }
        }

        reservationMongo.checkIn = reservationUpdated.checkIn
        reservationMongo.checkOut = reservationUpdated.checkOut
        reservationMongo.save()

        roomFree.reservedDays = roomFree.reservedDays.filter((x) => {
            return (
                reservationMongo.checkIn !== x &&
                reservationMongo.checkOut !== x
            )
        })

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
