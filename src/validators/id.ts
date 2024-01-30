import { z } from 'zod'

export const idMongo = z
    .object({
        $oid: z.string(),
    })
    .optional()
