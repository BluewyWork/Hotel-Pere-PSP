import mongoose from 'mongoose'
import { Answer } from '../../models/answer'
import { Employee } from '../../models/employee'
import { employeeSchema } from '../../db/schemas/employee'
import { Context } from 'hono'
import { setCookie } from 'hono/cookie'
import { sign } from 'hono/jwt'

export const adminUpdateEmployee = async (c: Context): Promise<Answer> => {
    const EmployeeModel = mongoose.model<Employee>('employees', employeeSchema)
    const body = await c.req.json()

    const payload = await c.get('jwtPayload')

    try {
        if (payload.admin) {
            const getUser = await EmployeeModel.findOne({ email: body.email })

            if (!getUser) {
                return {
                    data: 'No se ha encontrado el empleado',
                    status: 404,
                    ok: false,
                }
            }

            const result = await EmployeeModel.findOneAndUpdate(
                { email: body.email },
                { $set: { name: body.name, surname: body.surname } },
                {
                    upsert: true,
                    new: true,
                }
            )

            if (!result) {
                return {
                    data: 'No se ha podido actualizar el empleado',
                    status: 422,
                    ok: false,
                }
            }

            const newPayload = {
                _id: result.id,
                name: result.name,
                surname: result.surname,
                admin: result.admin,
                email: result.email,
            }

            setCookie(
                c,
                'jwt',
                await sign(newPayload, process.env.JWT_SECRET!!),
                {
                    sameSite: 'Lax',
                    path: '/',
                }
            )
            return {
                data: 'Se ha actualizado el empleado',
                status: 200,
                ok: true,
            }
        }

        return {
            data: 'No tiene permiso para actualizar empleado',
            status: 401,
            ok: false,
        }
    } catch (error) {
        console.log(error)

        return {
            data: error,
            status: 422,
            ok: false,
        }
    }
}
