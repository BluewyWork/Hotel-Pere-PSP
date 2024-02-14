import mongoose from 'mongoose'
import { roomSchema } from '../../db/schemas/room'
import { Room } from '../../models/room'
import { Answer } from '../../models/answer'

export const guestShowRoom = async (number: Number): Promise<Answer> => {
    const RoomModel = mongoose.model<Room>('rooms', roomSchema)

    try {
        const room = await RoomModel.findOne({ number: number })

        if (room) {
            return {
                data: room,
                status: 200,
                ok: true,
            }
        }

        return {
            data: 'No se encontró la habitación',
            status: 404,
            ok: false,
        }
    } catch (error) {
        return {
            data: 'Error al procesar la solicitud',
            status: 422,
            ok: false,
        }
    }
}
