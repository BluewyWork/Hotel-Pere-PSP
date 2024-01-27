export interface Bill {
    customerId: String
    totalAmount: number
    items: Array<[String, number]>
}
