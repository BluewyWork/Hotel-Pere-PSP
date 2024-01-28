export interface Bill {
    customerName: String
    customerEmail: String
    totalAmount: number
    items: Array<Map<String, number>>
}
