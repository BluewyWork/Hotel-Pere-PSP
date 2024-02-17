import mongoose from 'mongoose'
import { roomSchema } from '../../db/schemas/room'
import { Room } from '../../models/room'
import { Answer } from '../../models/answer'

interface Filter {
    beds?: any
    pricePerNight?: any
    reservedDays?: any
    number?: any
}

export const employeeShowFilteredRooms = async (c: any): Promise<Answer> => {
    const bed = c.req.query('beds')
    const price = c.req.query('pricePerNight')
    const checkIn = c.req.query('checkIn')
    const checkOut = c.req.query('checkOut')

    const number = c.req.query('number')

    console.log(bed,price);
    


    const RoomModel = mongoose.model<Room>('rooms', roomSchema)

    const filter: Filter = {}

    if (price) {
        filter.pricePerNight = { $eq: parseFloat(price) }
    }

    if (number) {
        filter.number = { $eq: parseInt(number) }
    }

    if (bed) {
        filter.beds = { $eq: parseInt(bed) }
    }

    if (checkIn && checkOut) {
        filter.reservedDays = {
            $not: {
                $elemMatch: {
                    checkIn: {
                        $lte: checkIn,
                    },
                    checkOut: {
                        $gte: checkOut,
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
