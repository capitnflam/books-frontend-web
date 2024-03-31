import { z } from 'zod'

export const pageParameterSchema = z.object({
  page: z
    .string()
    .regex(/^\d+$/)
    .nullish()
    .transform((value) => (value == null ? 1 : Number.parseInt(value, 10))),
  limit: z
    .string()
    .regex(/^\d+$/)
    .nullish()
    .transform((value) => (value == null ? 10 : Number.parseInt(value, 10))),
})

export type PageParameter = z.infer<typeof pageParameterSchema>
