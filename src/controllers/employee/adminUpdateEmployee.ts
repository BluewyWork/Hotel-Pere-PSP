import mongoose from 'mongoose'
import { Answer } from '../../models/answer'
import { Employee } from '../../models/employee'
import { employeeSchema } from '../../db/schemas/employee'
import { checkAdmin } from '../../validators/checkAdmin'

export const adminUpdateEmployee = async (c: any): Promise<Answer> => {
    const EmployeeModel = mongoose.model<Employee>('employee', employeeSchema)
    const guestEmail = c.req.param('email')
    const body = await c.req.json()

    try {
        if (await checkAdmin(c)) {
            const result = EmployeeModel.updateOne(
                { email: guestEmail },
                {
                    $set: {
                        name: body.name,
                        surname: body.surname,
                        email: body.email,
                    },
                }
            )
            if (!result) {
                return {
                    data: 'No se ha podido actualizar el empleado',
                    status: 422,
                    ok: false,
                }
            }
            return {
                data: 'Empleado actualizado',
                status: 200,
                ok: true,
            }
        } else {
            return {
                data: 'No tiene permiso para actualizar empleado',
                status: 401,
                ok: false,
            }
        }
    } catch (error) {
        return {
            data: error,
            status: 422,
            ok: false,
        }
    }
}
