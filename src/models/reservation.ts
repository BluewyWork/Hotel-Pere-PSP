export interface Reservation {
    customerId: String
    roomId: String
    checkIn: Date
    checkOut: Date
    status: Status
}

export enum Status {
    Confirmed, Pending, Cancelled
}