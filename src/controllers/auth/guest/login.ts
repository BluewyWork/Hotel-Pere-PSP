import mongoose from 'mongoose'
import { Answer } from '../../../models/answer'
import { guestSchema } from '../../../db/schemas/guest'
import { verfifyPassword } from '../../../utils/auth'
import { setCookie } from 'hono/cookie'
import { sign } from 'hono/jwt'
import { ValidateGuestLogin } from '../../../validators/auth'
import { Guest as Guest } from '../../../models/guest'
import { Employee } from '../../../models/employee'

export const guestLogin = async (c: any): Promise<Answer> => {
    const GuestModel = mongoose.model<Guest>('guests', guestSchema)

    const guest = (await c.req.json()) as Guest

    const validateGuest = ValidateGuestLogin.safeParse(guest)

    if (!validateGuest.success) {
        return {
            data: validateGuest.error.message,
            status: 422,
            ok: false,
        }
    }

    const queriedGuest = await GuestModel.findOne({
        email: guest.email,
    }).exec()

    if (!queriedGuest) {
        return {
            data: 'Invalid Credentials',
            status: 401,
            ok: false,
        }
    }

    const verifyPassword = await verfifyPassword(
        validateGuest.data.password,
        queriedGuest.password.toString()
    )

    if (!verifyPassword) {
        return {
            data: 'UwU',
            status: 422,
            ok: false,
        }
    }

    const x = {
        id: queriedGuest.id,
        name: queriedGuest.name,
        surname: queriedGuest.surname,
        email: queriedGuest.email,
    }

    const token = await sign(x, process.env.JWT_SECRET!!)

    // setCookie(
    //     c,
    //     'jwt',
    //     token,
    // )

    return {
        data: {
            token,
        },
        status: 200,
        ok: true,
    }
}
