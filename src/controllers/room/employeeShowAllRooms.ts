import mongoose from 'mongoose'
import { roomSchema } from '../../db/schemas/room'
import { Answer } from '../../models/answer'
import { Room } from '../../models/room'
import { Context } from 'hono'

export const employeeShowAllRooms = async (c: Context): Promise<Answer> => {
    const RoomModel = mongoose.model<Room>('rooms', roomSchema)

    const payload = c.get('jwtPayload')
    console.log(payload.admin)

    try {
        const queriedRooms = await RoomModel.find()

        if (queriedRooms) {
            return {
                data: queriedRooms,
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
        return {
            data: 'Error al procesar la solicitud',
            status: 422,
            ok: false,
        }
    }
}
