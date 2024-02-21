import mongoose from 'mongoose'
import { guestSchema } from '../../db/schemas/guest'
import { Answer } from '../../models/answer'
import { Guest } from '../../models/guest'

export const deleteGuest = async (c: any): Promise<Answer> => {
    const GuestModel = mongoose.model<Guest>('guest', guestSchema)

    const payload = c.get('jwtPayload')

    try {
        const result = await GuestModel.deleteOne({ _id: payload._id })

        console.log(result.deletedCount)

        if (result.deletedCount === 1) {
            console.log('Se ha eliminado correctamente')

            return {
                data: { message: 'Se ha eliminado correctamente' },
                status: 200,
                ok: true,
            }
        }

        return {
            data: 'El cliente no existe',
            status: 400,
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
