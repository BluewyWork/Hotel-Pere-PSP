import { Answer } from '../../../models/answer'
import { User } from '../../../models/user'
import { hashPassword, verfifyPassword } from '../../../utils/auth'
import { ValidateUserLogin } from '../../../validators/auth'
import { sign } from 'hono/jwt'
import { setCookie } from 'hono/cookie'
import mongoose from 'mongoose'
import { Employee } from '../../../models/employee'
import { employeeSchema } from '../../../db/schemas/employee'

export const login = async (c: any): Promise<Answer> => {
    const EmployeeModel = mongoose.model<Employee>('Employee', employeeSchema)

    const invalidCredentials: Answer = {
        data: 'Invalid Credentials',
        status: 401,
        ok: false,
    }
    const employee = (await c.req.json()) as User

    const valdiateEmployee = ValidateUserLogin.safeParse(employee)

    if (!valdiateEmployee.success) {
        return {
            data: valdiateEmployee.error.message,
            status: 422,
            ok: false,
        }
    }

    try {
        const queriedEmployee = await EmployeeModel.findOne({
            email: employee.email,
        }).exec()

        if (!queriedEmployee) {
            return invalidCredentials
        }

        const verifyPassword = await verfifyPassword(
            employee.password,
            queriedEmployee.password.toString()
        )
        if (!verifyPassword) {
            return invalidCredentials
        }

        setCookie(
            c,
            'jwt',
            await sign(queriedEmployee.email, process.env.JWT_SECRET!!),
            {
                sameSite: 'Lax',
                path: '/',
            }
        )

        return {
            data: 'Inicio de sesion correcto',
            status: 200,
            ok: true,
        }
    } catch (error) {
        return {
            data: 'error',
            status: 422,
            ok: false,
        }
    }
}
