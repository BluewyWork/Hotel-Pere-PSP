import mongoose, { ObjectId } from 'mongoose'
import { Answer } from '../../models/answer'
import { roomSchema } from '../../db/schemas/room'
import { Reservation } from '../../models/reservation'
import { reservationSchema } from '../../db/schemas/reservation'
import { Room } from '../../models/room'
import { Context } from 'hono'

export const guestCancelReservation = async (
    c: any,
    id: string
): Promise<Answer> => {
    const payload = c.get('jwtPayload')
    console.log(payload)

    const objectId = new mongoose.Types.ObjectId(id)
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
            if (payload.email !== reservation.guestEmail) {
                return {
                    data: 'No tienes permiso para eliminar esta reserva',
                    status: 403,
                    ok: false,
                }
            }
            const roomFree = await RoomModel.findOne({
                number: reservation.roomNumber,
            })

            if (!roomFree) {
                return {
                    data: 'Habitación no encontrada',
                    status: 404,
                    ok: false,
                }
            } else {
                for (let i = 0; i < roomFree.reservedDays.length; i++) {
                    if (
                        roomFree.reservedDays[i]._reservationId.equals(
                            reservation._id
                        )
                    ) {
                        roomFree.reservedDays.splice(i, 1)
                        break
                    }
                }

                roomFree.save()

                const result = await ReservationModel.deleteOne({
                    _id: objectId,
                })

                if (result.deletedCount === 1) {
                    return {
                        data: 'Reserva eliminada correctamente',
                        status: 200,
                        ok: true,
                    }
                }
                return {
                    data: 'No se pudo eliminar la reserva',
                    status: 500,
                    ok: false,
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
