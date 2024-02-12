export interface Guest {
    _id?: { $oid: string }
    name?: string
    surname: string
    email: string
    image: string
    password: string
    created_at?: Date
}
