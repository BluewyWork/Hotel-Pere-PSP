export interface Bill {
    guestName: String
    guestEmail: String
    totalAmount: number
    items: Array<[String, number]>
    created_at?: Date
}
