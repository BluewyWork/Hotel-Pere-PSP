import { z } from 'zod'

const errors = {
    invalid_credentials: 'Invalid credentials',
    password_length: 'Password must be 4 characters',
}

export const ValidateUserRegister = z
    .object({
        name: z
            .string()
            .min(1, { message: 'Invalid username. Must be 1 character.' })
            .trim(),
        email: z
            .string()
            .min(1, { message: 'This field has to be filled.' })
            .email({ message: 'Invalid email' }),
        password: z.string().min(4, { message: errors.password_length }).trim(),
        password_confirm: z
            .string()
            .min(4, { message: errors.password_length })
            .trim(),
    })
    .refine((user) => user.password === user.password_confirm, {
        message: "Passwords don't match",
    })

export const ValidateUserLogin = z.object({
    email: z
        .string()
        .min(1, { message: errors.invalid_credentials })
        .email({ message: errors.invalid_credentials }),
    password: z.string().min(1, { message: errors.invalid_credentials }).trim(),
})
