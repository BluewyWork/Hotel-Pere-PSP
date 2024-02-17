import mongoose from 'mongoose'
import { guestSchema } from '../../db/schemas/guest'
import { Answer } from '../../models/answer'
import { Guest } from '../../models/guest'

export const updateGuest = async (c: any): Promise<Answer> => {
    const GuestModel = mongoose.model<Guest>('guest', guestSchema)

    const guest = (await c.req.json()) as Guest

    try {
        const result = await GuestModel.updateOne(
            { email: guest.email },
            { $set: { name: guest.name, surname: guest.surname } }
        )

        if (result.modifiedCount === 0) {
            return {
                data: 'El cliente no existe',
                status: 404,
                ok: false,
            }
        }
        return {
            data: 'Se ha actualizado correctamente',
            status: 200,
            ok: true,
        }
    } catch (error) {
        console.error(error)

        return {
            data: 'Error al procesar la solicitud',
            status: 500,
            ok: false,
        }
    }
}
