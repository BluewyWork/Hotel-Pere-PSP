import mongoose from 'mongoose'
import { Answer } from '../../models/answer'
import { employeeSchema } from '../../db/schemas/employee'
import { Employee } from '../../models/employee'
import { checkAdmin } from '../../validators/checkAdmin'

export const adminCreateEmployee = async (c: any): Promise<Answer> => {
    const body = await c.req.json()
    const EmployeeModel = mongoose.model<Employee>('employees', employeeSchema)

    const employee = {
        name: body.name,
        surname: body.surname,
        email: body.email,
        admin: body.admin,
        image: body.image,
        password: body.password,
    }

    try {
        if (await checkAdmin(c)) {
            const result = await EmployeeModel.create(employee)
            if (!result) {
                return {
                    data: 'Error al crear empleado',
                    status: 422,
                    ok: false,
                }
            } else {
                return {
                    data: 'Empleado creado',
                    status: 201,
                    ok: true,
                }
            }
        } else {
            return {
                data: 'No tiene permiso para crear empleado',
                status: 401,
                ok: false,
            }
        }
    } catch (error) {
        return {
            data: 'Error al procesar la solicitud',
            status: 422,
            ok: false,
        }
    }
}
