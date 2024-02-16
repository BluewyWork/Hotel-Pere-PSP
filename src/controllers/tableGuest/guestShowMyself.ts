import { Answer } from '../../models/answer'
import { Context } from 'hono'

export const guestShowMyself = async (c: Context): Promise<Answer> => {
    const guest = c.get('jwtPayload')

    if (!guest.hasOwnProperty('image')) {
        guest.image = ''
    }

    return {
        data: guest,
        status: 200,
        ok: true,
    }
}
