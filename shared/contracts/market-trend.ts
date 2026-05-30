import { oc } from '@orpc/contract'
import { MarketTrendIndexSchema, MarketTrendRefreshResultSchema } from '../schemas/market-trend'

export const marketTrendContract = {
  list: oc
    .route({
      method: 'GET',
      path: '/market-trends',
      summary: 'List market trend indexes',
      tags: ['Market trends'],
    })
    .output(MarketTrendIndexSchema.array()),

  refresh: oc
    .route({
      method: 'POST',
      path: '/market-trends/refresh',
      summary: 'Refresh market trend index data',
      tags: ['Market trends'],
    })
    .output(MarketTrendRefreshResultSchema),
}
