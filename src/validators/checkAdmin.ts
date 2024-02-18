import { boolean, string } from 'zod'

export const checkAdmin = async (c: any) => {
    const token = await c.req.cookie('jwt')
    const [header, payload, signature] = token.split('.')
    const decodedPayload = Buffer.from(payload, 'base64').toString('utf-8')
    const payloadObject = JSON.parse(decodedPayload)
    return payloadObject.admin
}
