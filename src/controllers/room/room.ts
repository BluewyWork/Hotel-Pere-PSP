import mongoose from "mongoose";
import { Answer } from "../../models/answer";
import { Room } from "../../models/room";
import { invalidContent } from "../../utils/validators";
import { ValidateRoom } from "../../validators/room";
import { roomSchema } from "../../db/schemas/room";
import { ParseStatus, number } from "zod";

const RoomModel = mongoose.model<Room>('rooms', roomSchema);

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

export const deleteRoom = async (number:Number): Promise<Answer> => {
    console.log(number)
    try {
        
        const result = await RoomModel.deleteOne({'number': number});

        if (result.deletedCount = 1) {
            return {
                data: 'Habitación eliminada correctamente',
                status: 200, // Cambiado a 204 No Content
                ok: true,
            };
        } else {
            return {
                data: 'No se encontró la habitación',
                status: 404, // Cambiado a 404 Not Found
                ok: false,
            };
        }
    } catch (error) {
        return {
            data: 'Error al procesar la solicitud',
            status: 422,
            ok: false,
        };
    }
};

export const updateRoom = async (c:any, number:Number): Promise<Answer> => {
    
    const room = (await c.req.json()) as Room
    
    try {
        const result = await RoomModel.updateOne({'number': number,
         'reserved': room.reserved, 'image' : room.image, 'section' : room.section, 
         'bed': room.bed, 'pricePerNight': room.pricePerNight
        
        });

        if (result.upsertedCount = 1) {
            return {
                data: 'Habitación actualizada correctamente',
                status: 200, // Cambiado a 204 No Content
                ok: true,
            };
        } else {
            return {
                data: 'No se encontró la habitación',
                status: 404, // Cambiado a 404 Not Found
                ok: false,
            };
        }
    } catch (error) {
        return {
            data: 'Error al procesar la solicitud',
            status: 422,
            ok: false,
        };
    }
};

export const getOneRoom = async ( number:Number): Promise<Answer> => {
    
    try {
        
        const result = await RoomModel.findOne({'number': number});

        if (result) {
            return {
                data: result,
                status: 200, // Cambiado a 204 No Content
                ok: true,
            };
        } else {
            return {
                data: 'No se encontró la habitación',
                status: 404, // Cambiado a 404 Not Found
                ok: false,
            };
        }
    } catch (error) {
        return {
            data: 'Error al procesar la solicitud',
            status: 422,
            ok: false,
        };
    }
};
export const getAllConfirmed = async (confirmed: String): Promise<Answer> => {
    
    try {
        
        const result = await RoomModel.find({'reserved': confirmed});

        if (result) {
            return {
                data: result,
                status: 200, // Cambiado a 204 No Content
                ok: true,
            };
        } else {
            return {
                data: 'No se encontraron habitaciones',
                status: 404, // Cambiado a 404 Not Found
                ok: false,
            };
        }
    } catch (error) {
        return {
            data: 'Error al procesar la solicitud',
            status: 422,
            ok: false,
        };
    }
};

export const getAllCancelled = async (cancelled: String): Promise<Answer> => {
    
    try {
        
        const result = await RoomModel.find({'cancelled': cancelled});

        if (result) {
            return {
                data: result,
                status: 200, // Cambiado a 204 No Content
                ok: true,
            };
        } else {
            return {
                data: 'No se encontraron habitaciones',
                status: 404, // Cambiado a 404 Not Found
                ok: false,
            };
        }
    } catch (error) {
        return {
            data: 'Error al procesar la solicitud',
            status: 422,
            ok: false,
        };
    }
};