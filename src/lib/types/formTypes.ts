import { z } from 'zod'

export const BasicSchema = z.object({
  email:z.string().email().trim().min(2, {message:'email must be two or more'}).toLowerCase(),
  password:z.string().trim().min(8, {message:'password must be minimum of 8 characters'})
})

export const BasicSchemaWithPass = BasicSchema.extend({
  confirmPassword:z.string().trim().min(8, {message:'password must be minimum of 8 characters'})
})

export type UserType = z.infer<typeof BasicSchemaWithPass>

