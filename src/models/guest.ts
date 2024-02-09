export interface Guest {
    _id?: { $oid: string }
    name?: string
    surname: string
    email: string
    password: string
    password_confirm?: string
    created_at?: Date
}
