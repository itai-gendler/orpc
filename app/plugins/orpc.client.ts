import type { ContractRouterClient } from '@orpc/contract'
import type { JsonifiedClient } from '@orpc/openapi-client'
import { createORPCClient } from '@orpc/client'
import { OpenAPILink } from '@orpc/openapi-client/fetch'
import { createTanstackQueryUtils } from '@orpc/tanstack-query'
import { orpcContract } from '#shared/orpc-contract'

export default defineNuxtPlugin(() => {
  const link = new OpenAPILink(orpcContract, {
    url: `${window.location.origin}/api`,
    headers: () => ({}),
  })

  const client = createORPCClient<JsonifiedClient<ContractRouterClient<typeof orpcContract>>>(link)

  const orpc = createTanstackQueryUtils(client)

  return {
    provide: {
      orpc,
    },
  }
})
