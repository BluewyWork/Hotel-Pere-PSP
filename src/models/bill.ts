export interface Bill {
    customerId: String
    totalAmount: number
    items: Array<Map<String, number>>
}
