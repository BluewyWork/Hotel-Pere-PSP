import { z } from 'zod'

const errors = {
    invalid_credentials: 'Invalid credentials',
    password_length: 'Password must be 4 characters',
}

export const ValidateGuestRegister = z.object({
    name: z
        .string()
        .min(1, { message: 'Invalid username. Must be 1 character.' })
        .trim(),
    surname: z.string().trim(),
    email: z
        .string()
        .min(1, { message: 'This field has to be filled.' })
        .email({ message: 'Invalid email' }),
    password: z.string().min(4, { message: errors.password_length }).trim(),
})

export const ValidateGuestLogin = z.object({
    email: z
        .string()
        .min(1, { message: errors.invalid_credentials })
        .email({ message: errors.invalid_credentials }),
    password: z.string().min(1, { message: errors.invalid_credentials }).trim(),
})
