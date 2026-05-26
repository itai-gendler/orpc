import { eventIterator, oc } from '@orpc/contract'
import * as z from 'zod'
import { NewPlanetSchema, PlanetSchema, UpdatePlanetSchema } from './schemas/planet'

export const orpcContract = {
  planet: {
    list: oc
      .route({
        method: 'GET',
        path: '/planets',
        summary: 'List all planets',
        tags: ['Planets'],
      })
      .input(
        z.object({
          limit: z.number().int().min(1).max(100).default(10),
          cursor: z.number().int().min(0).default(0),
        }),
      )
      .output(z.array(PlanetSchema)),

    create: oc
      .route({
        method: 'POST',
        path: '/planets',
        summary: 'Create a planet',
        tags: ['Planets'],
      })
      .input(NewPlanetSchema)
      .output(PlanetSchema),

    find: oc
      .route({
        method: 'GET',
        path: '/planets/{id}',
        summary: 'Find a planet',
        tags: ['Planets'],
      })
      .input(
        z.object({
          id: z.number().int().min(1),
        }),
      )
      .output(PlanetSchema),

    update: oc
      .route({
        method: 'PUT',
        path: '/planets/{id}',
        summary: 'Update a planet',
        tags: ['Planets'],
      })
      .errors({
        NOT_FOUND: {
          message: 'Planet not found',
          data: z.object({ id: UpdatePlanetSchema.shape.id }),
        },
      })
      .input(UpdatePlanetSchema)
      .output(PlanetSchema),
  },

  sse: oc
    .route({
      method: 'GET',
      path: '/sse',
      tags: ['SSE'],
      summary: 'Server-Sent Events',
    })
    .output(eventIterator(z.object({ time: z.date() }))),
}
