import mongoose from 'mongoose'
import { roomSchema } from '../../../db/schemas/room'
import { Room } from '../../../models/room'
import { Answer } from '../../../models/answer'

export const deleteRoom = async (number: Number): Promise<Answer> => {
    const RoomModel = mongoose.model<Room>('rooms', roomSchema)

    try {
        const result = await RoomModel.deleteOne({ number: number })

        if (result.deletedCount === 1) {
            return {
                data: 'Habitación eliminada correctamente',
                status: 200, // Cambiado a 204 No Content
                ok: true,
            }
        }
        return {
            data: 'No se encontró la habitación',
            status: 404, // Cambiado a 404 Not Found
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
