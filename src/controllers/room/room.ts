import mongoose from 'mongoose'
import { Answer } from '../../models/answer'
import { Room } from '../../models/room'
import { invalidContent } from '../../utils/validators'
import { ValidateRoom } from '../../validators/room'
import { roomSchema } from '../../db/schemas/room'
import { ParseStatus, number } from 'zod'

const RoomModel = mongoose.model<Room>('rooms', roomSchema)

export const getOneRoom = async (number: Number): Promise<Answer> => {
    try {
        const result = await RoomModel.findOne({ number: number })

        if (result) {
            return {
                data: result,
                status: 200, // Cambiado a 204 No Content
                ok: true,
            }
        } else {
            return {
                data: 'No se encontró la habitación',
                status: 404, // Cambiado a 404 Not Found
                ok: false,
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
export const getAllConfirmed = async (confirmed: String): Promise<Answer> => {
    try {
        const result = await RoomModel.find({ reserved: confirmed })

        if (result) {
            return {
                data: result,
                status: 200, // Cambiado a 204 No Content
                ok: true,
            }
        } else {
            return {
                data: 'No se encontraron habitaciones',
                status: 404, // Cambiado a 404 Not Found
                ok: false,
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

export const getAllCancelled = async (cancelled: String): Promise<Answer> => {
    try {
        const result = await RoomModel.find({ cancelled: cancelled })

        if (result) {
            return {
                data: result,
                status: 200, // Cambiado a 204 No Content
                ok: true,
            }
        } else {
            return {
                data: 'No se encontraron habitaciones',
                status: 404, // Cambiado a 404 Not Found
                ok: false,
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
