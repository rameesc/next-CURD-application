import * as z from 'zod'



export const userForm=z.object({
    name:z.string().min(3),
    email:z.string().email(),
    profession:z.string().min(1)
})

export const updateUser=z.object({
    name:z.optional(z.string().min(3)),
    email:z.optional(z.string().email()),
    profession:z.optional(z.string().min(2))
})