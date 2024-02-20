import mongoose from 'mongoose'
import { Answer } from '../../models/answer'
import { Room } from '../../models/room'
import { roomSchema } from '../../db/schemas/room'

export const employeeUpdateRoom = async (c: any): Promise<Answer> => {
    const RoomModel = mongoose.model<Room>('rooms', roomSchema)

    const room = (await c.req.json()) as Room

    console.log(room)

    try {
        const updatedRoom = await RoomModel.findOneAndUpdate(
            { number: room.number },
            room,
            {
                upsert: true,
                new: true,
            }
        )

        if (updatedRoom) {
            return {
                data: 'Habitación actualizada correctamente',
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
            data: error,
            status: 422,
            ok: false,
        }
    }
}
