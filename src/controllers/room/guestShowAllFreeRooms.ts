import mongoose from 'mongoose'
import { roomSchema } from '../../db/schemas/room'
import { Answer } from '../../models/answer'
import { Room } from '../../models/room'

export const guestShowAllFreeRooms = async (c: any): Promise<Answer> => {
    const RoomModel = mongoose.model<Room>('rooms', roomSchema)

    try {
        const result = await RoomModel.find({ reserved: { $exists: false } })

        if (result && result.length > 0) {
            return {
                data: result,
                status: 200,
                ok: true,
            }
        }

        return {
            data: 'No se encontraron habitaciones',
            status: 404,
            ok: false,
        }
    } catch (error) {
        console.error(error)

        return {
            data: 'Error al procesar la solicitud',
            status: 500,
            ok: false,
        }
    }
}
