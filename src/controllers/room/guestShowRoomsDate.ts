import mongoose from 'mongoose'
import { Answer } from '../../models/answer'
import { Room } from '../../models/room'
import { roomSchema } from '../../db/schemas/room'

export const guestShowRoomsDate = async (
    checkIn: string,
    checkOut: string
): Promise<Answer> => {
    try {
        const RoomModel = mongoose.model<Room>('rooms', roomSchema)
        const checkInDate = new Date(checkIn)
        const checkOutDate = new Date(checkOut)

        const availableRooms = await RoomModel.find({
            dateOccupied: {
                $not: { $elemMatch: { $gte: checkInDate, $lte: checkOutDate } },
            },
        })

        return {
            data: availableRooms,
            status: 200,
            ok: true,
        }
    } catch (error) {
        return {
            data: 'Error al procesar la solicitud',
            status: 500,
            ok: false,
        }
    }
}
