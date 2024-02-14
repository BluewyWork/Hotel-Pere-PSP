import mongoose from 'mongoose'
import { roomSchema } from '../../db/schemas/room'
import { Room } from '../../models/room'
import { Answer } from '../../models/answer'
import { boolean } from 'zod'

interface Filter {
    beds?: any
    pricePerNight?: any
    reserved?: any
}

export const employeeShowFilteredRooms = async (
    price: any,
    bed: any,
    reserved: any
): Promise<Answer> => {
    // since reserved (boolean) has change to an array of reservedDays
    // thus things must be changed to work properly
    return {
        data: 'Not yet implemented...',
        status: 400,
        ok: false,
    }

    const RoomModel = mongoose.model<Room>('rooms', roomSchema)

    // debug
    // console.log(price, bed, reserved)

    const filter: Filter = {}

    if (price != null) {
        filter.pricePerNight = { $gte: parseFloat(price) }
    }

    if (bed != null) {
        filter.beds = { $gte: parseInt(bed) }
    }

    if (reserved != null) {
        filter.reserved = reserved
    }

    console.log(filter)

    try {
        const result = await RoomModel.find(filter)

        if (result) {
            return {
                data: result,
                status: 200, // Cambiado a 204 No Content
                ok: true,
            }
        }

        return {
            data: 'No se encontró la habitación',
            status: 404, // Cambiado a 404 Not Found
            ok: false,
        }
    } catch (error) {
        console.log(error)

        return {
            data: 'Error al procesar la solicitud',
            status: 422,
            ok: false,
        }
    }
}
