import mongoose from 'mongoose'
import { roomSchema } from '../../db/schemas/room'
import { Room } from '../../models/room'
import { Answer } from '../../models/answer'

interface Filter {
    beds?: any
    pricePerNight?: any
    reservedDays?: any
}

export const employeeShowFilteredRooms = async (c: any): Promise<Answer> => {
    const bed = c.req.query('beds')
    const price = c.req.query('pricePerNight')
    const checkIn = c.req.query('checkIn')
    const checkOut = c.req.query('checkOut')
    console.log(bed, price, checkIn, checkOut)

    const RoomModel = mongoose.model<Room>('rooms', roomSchema)

    const filter: Filter = {}

    if (price) {
        filter.pricePerNight = { $lte: parseFloat(price) }
    }

    if (bed) {
        filter.beds = { $gte: parseInt(bed) }
    }
    if (checkIn && checkOut) {
        const checkInDate = new Date(checkIn)
        const checkOutDate = new Date(checkOut)
        filter.reservedDays = {
            $not: {
                $elemMatch: {
                    $or: [
                        {
                            checkIn: { $lt: checkOutDate },
                            checkOut: { $gt: checkInDate },
                        },
                        {
                            checkIn: { $gte: checkInDate, $lt: checkOutDate },
                        },
                        {
                            checkOut: { $gt: checkInDate, $lte: checkOutDate },
                        },
                    ],
                },
            },
        }
    }
    console.log(filter)

    try {
        const availableRooms = await RoomModel.find(filter)
        return {
            data: availableRooms,
            status: 200,
            ok: true,
        }
    } catch (error) {
        return {
            data: 'Error al obtener las habitaciones disponibles',
            status: 500,
            ok: false,
        }
    }
}
