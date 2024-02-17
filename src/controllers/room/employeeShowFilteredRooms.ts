import mongoose from 'mongoose'
import { roomSchema } from '../../db/schemas/room'
import { Room } from '../../models/room'
import { Answer } from '../../models/answer'
import { boolean } from 'zod'

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
            },
        }
    }

    try {
        const result = await RoomModel.find(filter)

        if (result && result.length > 0) {
            return {
                data: result,
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
        console.log(error)

        return {
            data: 'Error al procesar la solicitud',
            status: 500,
            ok: false,
        }
    }
}
