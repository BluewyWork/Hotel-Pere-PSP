import mongoose from 'mongoose'
import { Answer } from '../../../models/answer'
import { roomSchema } from '../../../db/schemas/room'
import { Reserved, Room } from '../../../models/room'
import { Customer } from '../../../models/customer'
import { Reservation, Status } from '../../../models/reservation'
import { customerSchema } from '../../../db/schemas/customer'
import { reservationSchema } from '../../../db/schemas/reservation'

const RoomModel = mongoose.model<Room>('rooms', roomSchema)
const CustomerModel = mongoose.model<Customer>('rooms', customerSchema)
const ReservationModel = mongoose.model<Reservation>('rooms', reservationSchema)

export const bookRoom = async (c: any, roomNumber: number): Promise<Answer> => {
    const payload = c.get('jwtPayload')

    // const dates = c.

    try {
        const room = await RoomModel.findOne({ number: roomNumber })
        const client = await CustomerModel.findOne({ email: payload.email })

        if (!room) {
            return {
                data: 'Room not exist',
                status: 404,
                ok: false,
            }
        }

        if (!client) {
            return {
                data: 'User not exist',
                status: 404,
                ok: false,
            }
        }

        const booking: Reservation = {
            customerName: client.name,
            customerEmail: client.email,
            roomNumber: room?.number,
            roomPrice: room.pricePerNight,
            checkIn: new Date(Date.now()),
            checkOut: new Date(Date.now()),
            status: Status.Confirm,
        }

        ReservationModel.create(booking)
        RoomModel.updateOne(
            { number: roomNumber },
            { $set: { reserved: Reserved.Confirm } }
        )

        return {
            data: 'Reservada realizada correctamente',
            status: 201,
            ok: true,
        }
    } catch (error) {
        return {
            data: 'Error al procesar la solicitud',
            status: 422,
            ok: false,
        }
    }
}
