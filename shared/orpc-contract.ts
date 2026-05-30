import { marketTrendContract } from './contracts/market-trend'
import { planetContract } from './contracts/planet'
import { sseContract } from './contracts/sse'

export const orpcContract = {
  marketTrend: marketTrendContract,
  planet: planetContract,
  sse: sseContract,
}
