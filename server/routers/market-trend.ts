import { authed, pub } from '../orpc'
import { retry } from '../middlewares/retry'

export const marketTrendRouter = {
  list: pub
    .marketTrend
    .list
    .use(retry({ times: 3 }))
    .handler(async ({ context }) => {
      return context.db.marketTrends.list()
    }),

  refresh: authed
    .marketTrend
    .refresh
    .handler(async ({ context }) => {
      return context.db.marketTrends.refresh()
    }),
}
