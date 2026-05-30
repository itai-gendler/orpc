import { orpc } from '../orpc'
import { marketTrendRouter } from './market-trend'
import { planetRouter } from './planet'
import { sse } from './sse'

export const router = orpc.router({
  marketTrend: marketTrendRouter,
  planet: planetRouter,
  sse,
})
