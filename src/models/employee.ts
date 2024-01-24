export interface Employee {
    name: String
    role: EmployeeRole
    contact: String
}

export enum EmployeeRole {
    Admin, Normal
}