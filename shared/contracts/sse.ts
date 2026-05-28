import { eventIterator, oc } from '@orpc/contract'
import * as z from 'zod'

export const sseContract = oc
  .route({
    method: 'GET',
    path: '/sse',
    tags: ['SSE'],
    summary: 'Server-Sent Events',
  })
  .output(eventIterator(z.object({ time: z.date() })))
