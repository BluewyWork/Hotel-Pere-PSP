import mongoose from 'mongoose'
import { roomSchema } from '../../db/schemas/room'
import { Room } from '../../models/room'
import { Answer } from '../../models/answer'

export const publicShowRoom = async (c: any): Promise<Answer> => {
    const roomNumber = parseInt(c.req.param('roomNumber'))

    if (isNaN(roomNumber)) {
        return {
            data: 'Parsing Error',
            status: 400,
            ok: true,
        }
    }

    const RoomModel = mongoose.model<Room>('rooms', roomSchema)

    const room = await RoomModel.findOne({ number: roomNumber })

    if (!room) {
        return {
            data: 'No se encontró la habitación',
            status: 404,
            ok: false,
        }
    }

    return {
        data: room,
        status: 200,
        ok: true,
    }
}
