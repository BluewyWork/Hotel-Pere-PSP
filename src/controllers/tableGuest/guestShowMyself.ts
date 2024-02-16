import { Answer } from '../../models/answer'
import { Context } from 'hono'

export const guestShowMyself = async (c: Context): Promise<Answer> => {
    const guest = c.get('jwtPayload')

    return {
        data: guest,
        status: 200,
        ok: true,
    }
}
