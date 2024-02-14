import mongoose from 'mongoose'
import { roomSchema } from '../../db/schemas/room'
import { Room } from '../../models/room'
import { Answer } from '../../models/answer'
import { boolean } from 'zod'

interface Filter {
    beds?: any
    pricePerNight?: any
    reservedDays?: any
}

export const employeeShowFilteredRooms = async (
    price: any,
    bed: any,
    reserved: any
): Promise<Answer> => {
    const RoomModel = mongoose.model<Room>('rooms', roomSchema)

    const filter: Filter = {}

    if (price !== null) {
        filter.pricePerNight = { $gte: parseFloat(price) }
    }

    if (bed !== null) {
        filter.beds = { $gte: parseInt(bed) }
    }

    if (reserved !== null) {
        if (reserved === 'notEmpty') {
            filter.reservedDays = { $elemMatch: { $exists: true } }
        } else if (reserved === 'empty') {
            filter.reservedDays = { $exists: false }
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
