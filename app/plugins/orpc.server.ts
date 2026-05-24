import { createRouterClient } from '@orpc/server'
import { router } from '../../server/routers'
import { createTanstackQueryUtils } from '@orpc/tanstack-query'

/**
 * This is part of the Optimize SSR setup.
 *
 * @see {@link https://orpc.dev/docs/adapters/nuxt#optimize-ssr}
 */
export default defineNuxtPlugin((nuxt) => {
  const requestHeaders = useRequestHeaders()
  const headers = new Headers()

  for (const [key, value] of Object.entries(requestHeaders)) {
    if (value) {
      headers.set(key, Array.isArray(value) ? value.join(', ') : value)
    }
  }

  const client = createRouterClient(router, {
    context: {
      headers,
    },
  })

  const orpc = createTanstackQueryUtils(client)

  return {
    provide: {
      orpc,
    },
  }
})
