export interface Bill {
    customerName: String
    customerEmail: String
    totalAmount: number
    items: Array<[String, number]>
    createdAt: Date
}
