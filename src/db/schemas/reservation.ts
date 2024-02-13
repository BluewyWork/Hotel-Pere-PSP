import mongoose from 'mongoose'
import { boolean } from 'zod'

const { Schema } = mongoose

export const reservationSchema = new Schema({
  idCustomer: String,
  customerName: String,
  customerEmail: String,
  roomNumber: Number,
  pricePerNight: Number,
  checkIn: Date,
  checkOut: Date,
  reserved: Boolean
})
