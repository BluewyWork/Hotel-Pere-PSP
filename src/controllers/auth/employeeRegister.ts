import mongoose from 'mongoose'
import { Answer } from '../../models/answer'
import { Employee } from '../../models/employee'
import { employeeSchema } from '../../db/schemas/employee'
import { ValidationEmployee } from '../../validators/employee'
import { invalidContent } from '../../utils/validators'
import { hashPassword } from '../../utils/auth'

export const employeeRegister = async (c: any): Promise<Answer> => {
    const EmployeeModel = mongoose.model<Employee>('Employee', employeeSchema)

    const employee = (await c.req.json()) as Employee

    const validateEmployee = ValidationEmployee.safeParse(employee)

    if (!validateEmployee.success) {
        return {
            data: validateEmployee.error.message,
            status: 422,
            ok: false,
        }
    }
    
    const sameEmail = await EmployeeModel.findOne({
        email: validateEmployee.data.email,
    })

    if(sameEmail) {
        return {
            data: 'El correo ya está en uso',
            status: 422,
            ok: false,
        }
    }

    try {
        validateEmployee.data.password = await hashPassword(
            validateEmployee.data.password
        )

        await EmployeeModel.create(validateEmployee.data)

        return {
            data: 'Usuario creado correctamente',
            status: 201,
            ok: true,
        }
    } catch (error) {
        return {
            data: error,
            status: 500,
            ok: false,
        }
    }
}
