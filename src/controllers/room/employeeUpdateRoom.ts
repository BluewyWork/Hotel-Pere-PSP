import mongoose from 'mongoose'
import { Answer } from '../../models/answer'
import { Room } from '../../models/room'
import { roomSchema } from '../../db/schemas/room'

export const employeeUpdateRoom = async (c: any): Promise<Answer> => {
    const RoomModel = mongoose.model<Room>('rooms', roomSchema)

    const room = (await c.req.json()) as Room

    try {
        const result = await RoomModel.updateOne(
            { number: room.number },
            {
                $set: {
                    section: room.section,
                    pricePerNight: room.pricePerNight,
                    reserved: room.reserved,
                    image: room.image,
                    beds: room.beds,
                },
            }
        )

        if ((result.upsertedCount = 1)) {
            return {
                data: 'Habitación actualizada correctamente',
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
        return {
            data: 'Error al procesar la solicitud',
            status: 422,
            ok: false,
        }
    }
}
