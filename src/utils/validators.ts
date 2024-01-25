import { SafeParseReturnType, ZodObject } from "zod"
import { Answer } from "../models/answer"

export const invalidContent = (el: any , validator: ZodObject<any> ):Answer|null =>{
    const validation  = validator.safeParse(el)
    
    if (!validation.success) {
        return {
            data: validation.error.message,
            
            status: 422,
            ok: false,
        }
    }

    return null
} 