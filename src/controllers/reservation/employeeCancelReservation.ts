import mongoose from 'mongoose'
import { Room } from '../../models/room'
import { Reservation } from '../../models/reservation'
import { roomSchema } from '../../db/schemas/room'
import { Answer } from '../../models/answer'
import { reservationSchema } from '../../db/schemas/reservation'

export const employeeCancelReservation = async (
    c: any,
    id: string
): Promise<Answer> => {
    const objectId = new mongoose.Types.ObjectId(id)
    console.log(objectId)

    const RoomModel = mongoose.model<Room>('rooms', roomSchema)
    const ReservationModel = mongoose.model<Reservation>(
        'reservations',
        reservationSchema
    )
    try {
        const reservation = await ReservationModel.findOne({ _id: objectId })
        if (!reservation) {
            return {
                data: 'Reserva no encontrada',
                status: 404,
                ok: false,
            }
        } else {
            const roomNumber = reservation.roomNumber
            const checkIn = reservation.checkIn
            const checkOut = reservation.checkOut
            const room = await RoomModel.findOne({ number: roomNumber })

            if (!room) {
                return {
                    data: 'Habitación no encontrada',
                    status: 404,
                    ok: false,
                }
            } else {
                const datesRange: Date[] = []
                const newDate = new Date(checkIn)

                while (newDate <= checkOut) {
                    datesRange.push(new Date(newDate))
                    newDate.setDate(newDate.getDate() + 1)
                }

                const updatedRoom = await RoomModel.updateOne(
                    { number: roomNumber },
                    { $pull: { dateOccupied: { $in: datesRange } } }
                )

                const result = await ReservationModel.deleteOne({
                    _id: objectId,
                })
                console.log(result)

                if (updatedRoom.modifiedCount === 0) {
                    return {
                        data: 'No se pudo actualizar la habitación',
                        status: 500,
                        ok: false,
                    }
                }

                if (result.deletedCount === 1) {
                    return {
                        data: 'Reserva eliminada correctamente',
                        status: 200,
                        ok: true,
                    }
                }

                return {
                    data: 'Fechas eliminadas correctamente de la habitación',
                    status: 200,
                    ok: true,
                }
            }
        }
    } catch (error) {
        return {
            data: 'Error al procesar la solicitud',
            status: 422,
            ok: false,
        }
    }
}
