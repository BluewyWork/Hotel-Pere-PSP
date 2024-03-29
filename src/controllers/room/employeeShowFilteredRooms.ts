import mongoose from 'mongoose'
import { roomSchema } from '../../db/schemas/room'
import { Room } from '../../models/room'
import { Answer } from '../../models/answer'
import { oneMoreDay, parseDateWithMidnight } from '../../utils/dates'

interface Filter {
    beds?: any
    pricePerNight?: any
    reservedDays?: any
    //number?: any
}

export const employeeShowFilteredRooms = async (c: any): Promise<Answer> => {
    const bed = c.req.query('beds')
    const price = c.req.query('pricePerNight')
    const checkIn = c.req.query('checkIn')
    const checkOut = c.req.query('checkOut')

    const RoomModel = mongoose.model<Room>('rooms', roomSchema)

    const filter: Filter = {}

    if (price) {
        filter.pricePerNight = { $eq: price.replace(',', '.') }
    }

    if (bed) {
        filter.beds = { $eq: parseInt(bed) }
    }

    try {
        if (checkIn && checkOut) {
            const checkInParse = new Date(
                parseDateWithMidnight(oneMoreDay(checkIn))
            )
            const checkOutParse = new Date(
                parseDateWithMidnight(oneMoreDay(checkOut))
            )

            filter.reservedDays = {
                $not: {
                    $elemMatch: {
                        checkIn: {
                            $lte: checkInParse,
                        },
                        checkOut: {
                            $gte: checkOutParse,
                        },
                    },
                },
            }
        }
        let rooms = await RoomModel.find(filter)

        return {
            data: rooms,
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
