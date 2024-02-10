import mongoose from 'mongoose'
import { Answer } from '../../../models/answer'
import { Guest } from '../../../models/guest'
import { guestSchema } from '../../../db/schemas/guest'
import { verify } from 'hono/jwt'

export const showMyself = async (c: any): Promise<Answer> => {
    const GuestModel = mongoose.model<Guest>('guests', guestSchema)

    const guest = c.get('guest')

    console.log(guest.name)

    return {
        data: "testing...",
        status: 200,
        ok: true
    }
}
