import { Answer } from '../../../models/answer'
import { User } from '../../../models/user'
import { hashPassword } from '../../../utils/auth'
import { ValidateUserRegister } from '../../../validators/auth'
import mongoose from 'mongoose'
import { userSchema } from '../../../db/schemas/user'

export const saveUser = async (c: any): Promise<Answer> => {
    const UserModel = mongoose.model<User>('Users', userSchema)

    const user = (await c.req.json()) as User

    const validateUser = ValidateUserRegister.safeParse(user)

    if (!validateUser.success) {
        return {
            data: validateUser.error.message,
            status: 422,
            ok: false,
        }
    }

    try {
        validateUser.data.password = await hashPassword(
            validateUser.data.password
        )

        await UserModel.create(user)

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
