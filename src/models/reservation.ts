export interface Reservation {
    customerId: String
    roomId: String
    checkIn: Date
    checkOut: Date
    status: Status
}

enum Status {
    Confirmed, Pending, Cancelled
}