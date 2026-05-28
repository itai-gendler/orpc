import type { ContractRouterClient } from '@orpc/contract'
import type { JsonifiedClient } from '@orpc/openapi-client'
import { createORPCClient } from '@orpc/client'
import { OpenAPILink } from '@orpc/openapi-client/fetch'
import { createTanstackQueryUtils } from '@orpc/tanstack-query'
import { orpcContract } from '#shared/orpc-contract'

export default defineNuxtPlugin(() => {
  const requestURL = useRequestURL()
  const requestHeaders = useRequestHeaders()
  const headers = new Headers()

  for (const [key, value] of Object.entries(requestHeaders)) {
    if (value) {
      headers.set(key, Array.isArray(value) ? value.join(', ') : value)
    }
  }

  const link = new OpenAPILink(orpcContract, {
    url: `${requestURL.origin}/api`,
    headers: () => headers,
  })

  const client = createORPCClient<JsonifiedClient<ContractRouterClient<typeof orpcContract>>>(link)

  const orpc = createTanstackQueryUtils(client)

  return {
    provide: {
      orpc,
    },
  }
})
