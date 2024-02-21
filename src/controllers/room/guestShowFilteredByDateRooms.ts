import mongoose from 'mongoose'
import { Answer } from '../../models/answer'
import { Room } from '../../models/room'
import { roomSchema } from '../../db/schemas/room'

export const guestShowFilteredbyDateRooms = async (
    checkIn: string,
    checkOut: string
): Promise<Answer> => {
    try {
        const RoomModel = mongoose.model<Room>('rooms', roomSchema)
        const checkInDate = new Date(checkIn)
        const checkOutDate = new Date(checkOut)

        const availableRooms = await RoomModel.find({
            $or: [
                {
                    reservedDays: {
                        $not: {
                            $elemMatch: {
                                checkIn: {
                                    $lte: checkInDate,
                                },
                                checkOut: {
                                    $gte: checkOutDate,
                                },
                            },
                        },
                    },
                },
                { reservedDays: { $exists: false } },
            ],
        })

        return {
            data: availableRooms,
            status: 200,
            ok: true,
        }
    } catch (error) {
        return {
            data: error,
            status: 500,
            ok: false,
        }
    }
}
