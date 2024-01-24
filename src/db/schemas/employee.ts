import mongoose from 'mongoose'
import { EmployeeRole } from '../../models/employee'
const { Schema } = mongoose
export const userSchema = new Schema({
    name: String,
    role: EmployeeRole,
    contact: String,

    created_at: { type: Date, default: Date.now }
})