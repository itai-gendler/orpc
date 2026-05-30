import { ORPCError } from '@orpc/server'
import { authed, pub } from '../orpc'
import { retry } from '../middlewares/retry'

export const planetRouter = {
  list: pub
    .planet
    .list
    .use(retry({ times: 3 }))
    .handler(async ({ input, context }) => {
      return context.db.planets.list(input.limit, input.cursor)
    }),

  create: authed
    .planet
    .create
    .handler(async ({ input, context }) => {
      return context.db.planets.create(input, context.user)
    }),

  find: pub
    .planet
    .find
    .use(retry({ times: 3 }))
    .handler(async ({ input, context }) => {
      const planet = await context.db.planets.find(input.id)

      if (!planet) {
        throw new ORPCError('NOT_FOUND', { message: 'Planet not found' })
      }

      return planet
    }),

  update: authed
    .planet
    .update
    .handler(async ({ input, context, errors }) => {
      const planet = await context.db.planets.find(input.id)

      if (!planet) {
        /**
         *  1. Type-Safe Error Handling
         *
         * {@link https://orpc.dev/docs/error-handling#type%E2%80%90safe-error-handling}
         */
        throw errors.NOT_FOUND({ data: { id: input.id } })

        /**
         * 2. Normal Approach
         *
         * {@link https://orpc.dev/docs/error-handling#normal-approach}
         */
        // throw new ORPCError('NOT_FOUND', { message: 'Planet not found' })
      }

      return context.db.planets.update(input)
    }),
}
