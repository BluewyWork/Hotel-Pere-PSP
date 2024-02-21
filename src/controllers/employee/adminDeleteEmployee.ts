import mongoose from 'mongoose'
import { Answer } from '../../models/answer'
import { Employee } from '../../models/employee'
import { employeeSchema } from '../../db/schemas/employee'
import { checkAdmin } from '../../validators/checkAdmin'
import { Context } from 'hono'

export const adminDeleteEmployee = async (c: Context): Promise<Answer> => {
    const EmployeeModel = mongoose.model<Employee>('employees', employeeSchema)
    const email = await c.req.param('email')

    const payload = c.get('jwtPayload')
    console.log(c.get('jwtPayload'))

    try {
        if (payload.admin) {
            const result = await EmployeeModel.deleteOne({ email: email })
            if (!result) {
                return {
                    data: 'No se ha podido eliminar el empleado',
                    status: 422,
                    ok: false,
                }
            }
            return {
                data: 'Empleado eliminado',
                status: 200,
                ok: true,
            }
        }
        return {
            data: 'No tiene permiso para eliminar empleado',
            status: 401,
            ok: false,
        }
    } catch (error) {
        return {
            data: 'Error al procesar la solicitud',
            status: 422,
            ok: false,
        }
    }
}
