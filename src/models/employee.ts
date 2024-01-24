export interface Employee {
    name: String
    role: EmployeeRole
    contact: String
}

enum EmployeeRole {
    Admin, Normal
}