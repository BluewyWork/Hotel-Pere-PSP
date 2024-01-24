import { Bill } from "./bill";
import { Reservation } from "./reservation";

export interface Customer {
    name: String
    email: String
    phone: String
    reservations: Array<Reservation>
    bills: Array<Bill>
}