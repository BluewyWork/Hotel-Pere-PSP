import { Answer } from '../../../models/answer'
import { Guest as Guest } from '../../../models/guest'
import { hashPassword } from '../../../utils/auth'
import { ValidateGuestRegister } from '../../../validators/auth'
import mongoose from 'mongoose'
import { guestSchema } from '../../../db/schemas/guest'

export const saveGuest = async (c: any): Promise<Answer> => {
    const GuestModel = mongoose.model<Guest>('guests', guestSchema)

    const guest = (await c.req.json()) as Guest

    const validateGuest = ValidateGuestRegister.safeParse(guest)

    if (!validateGuest.success) {
        return {
            data: validateGuest.error.message,
            status: 422,
            ok: false,
        }
    }

    try {
        validateGuest.data.password = await hashPassword(
            validateGuest.data.password
        )

        await GuestModel.create(validateGuest.data)

        return {
            data: 'Usuario creado correctamente',
            status: 201,
            ok: true,
        }
    } catch (error) {
        return {
            data: error,
            status: 422,
            ok: false,
        }
    }
}
