import mongoose from 'mongoose'
import { Answer } from '../../models/answer'
import { Employee } from '../../models/employee'
import { employeeSchema } from '../../db/schemas/employee'

export const adminShowEmoloyee = async (c: any): Promise<Answer> => {
    const EmployeeModel = mongoose.model<Employee>('employees', employeeSchema)

    try {
        const queriedGuests = await EmployeeModel.find().exec()

        return {
            data: queriedGuests,
            status: 200,
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
