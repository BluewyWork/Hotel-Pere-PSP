import mongoose from 'mongoose'
import { guestSchema } from '../../../db/schemas/guest'
import { Answer } from '../../../models/answer'
import { Guest } from '../../../models/guest'

export const showGuests = async (c: any): Promise<Answer> => {
    const GuestModel = mongoose.model<Guest>('Customer', guestSchema)

    try {
        const queriedGuests = await GuestModel.find().exec()

        return {
            data: queriedGuests,
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
