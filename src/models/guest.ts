export interface Guest {
    _id?: { $oid: string }
    name?: string
    surname: string
    email: string
    password: string
    created_at?: Date
}
