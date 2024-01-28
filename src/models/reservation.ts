export interface Reservation {
    customerName: String
    customerEmail: String
    roomNumber: Number
    roomPrice: Number
    checkIn: Date
    checkOut: Date
    status: Status
}

export enum Status {
    Cancelled = 'cancelled',
    Confirm = 'confirmed',
    Pending = 'pending',
}
