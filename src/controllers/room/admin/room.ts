import mongoose from "mongoose";
import { Answer } from "../../../models/answer";
import { Room } from "../../../models/room";
import { invalidContent } from "../../../utils/validators";
import { ValidateRoom } from "../../../validators/room";
import { roomSchema } from "../../../db/schemas/room";

const RoomModel = mongoose.model<Room>('Users', roomSchema);

export const saveRoom = async (c: any): Promise<Answer> =>{
    const room = (await c.req.json()) as Room

    const validation = invalidContent(room , ValidateRoom)
    if(validation){
        return validation
    }
    try{
        await RoomModel.create(room)

        return {
            data: 'Habitación creada correctamente',
            status: 201,
            ok: true,
        }
    } catch (error) {
        return {
            data: error,
            status: 422,
            ok: false,
        }
    }

}