export interface Bill {
    customerEmail: String
    totalAmount: number
    items: Array<[String, number]>
    createdAt: Date
}
