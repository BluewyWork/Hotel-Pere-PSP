import mongoose from 'mongoose'
import { Answer } from '../../../models/answer'
import { Guest } from '../../../models/guest'
import { guestSchema } from '../../../db/schemas/guest'

export const showOneGuest = async (c: any): Promise<Answer> => {
    const GuestModel = mongoose.model<Guest>('guests', guestSchema)

    const email = c.get('jwtPayload').email

    try {
        const queriedGuest = await GuestModel.findOne({
            email: email,
        }).exec()

        return {
            data: queriedGuest,
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
