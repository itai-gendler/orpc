import { JSON_SCHEMA_REGISTRY } from '@orpc/zod/zod4'
import * as z from 'zod'

export type User = z.infer<typeof UserSchema>

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
})

JSON_SCHEMA_REGISTRY.add(UserSchema, {
  examples: [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@doe.com',
    },
  ],
})
