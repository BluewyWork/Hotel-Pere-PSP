import mongoose from 'mongoose'
import { Answer } from '../../models/answer'
import { guestSchema } from '../../db/schemas/guest'
import { verfifyPassword } from '../../utils/auth'
import { setCookie } from 'hono/cookie'
import { sign } from 'hono/jwt'
import { ValidateGuestLogin } from '../../validators/auth'
import { Guest as Guest } from '../../models/guest'
import { Employee } from '../../models/employee'
import { Context } from 'hono'

export const guestLogin = async (c: Context): Promise<Answer> => {
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
        queriedGuest.password
    )

    if (!verifyPassword) {
        return {
            data: 'Invalid credentials',
            status: 422,
            ok: false,
        }
    }

    const guestWithoutPassword = {
        _id: queriedGuest.id,
        name: queriedGuest.name,
        surname: queriedGuest.surname,
        image: queriedGuest.image,
        email: queriedGuest.email,
    }

    const token = await sign(guestWithoutPassword, process.env.JWT_SECRET!!)

    console.log(token)

    return {
        data: {
            token,
        },
        status: 200,
        ok: true,
    }
}
