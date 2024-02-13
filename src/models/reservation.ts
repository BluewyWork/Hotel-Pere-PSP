import { ObjectId } from "mongoose"

export interface Reservation {
  _id: ObjectId;
  idCustomer: string;
  customerName: string;
  customerEmail: string;
  roomNumber: string;
  pricePerNight: number;
  checkIn: Date;
  checkOut: Date;
  reserved: boolean;
  created_at: Date;
}
