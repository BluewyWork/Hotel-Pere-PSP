import mongoose from 'mongoose'
import { roomSchema } from '../../db/schemas/room'
import { Answer } from '../../models/answer'
import { Room } from '../../models/room'

export const guestShowAllFreeRooms = async (c: any): Promise<Answer> => {
    // reserved (boolean) has changed to an array of days (reservedDays)
    return {
        data: 'Not yet implemented...',
        status: 400,
        ok: false,
    }

    const RoomModel = mongoose.model<Room>('rooms', roomSchema)

    try {
        const result = await RoomModel.find({ reserved: false })

        if (result) {
            return {
                data: result,
                status: 200, // Cambiado a 204 No Content
                ok: true,
            }
        }

        return {
            data: 'No se encontraron habitaciones',
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