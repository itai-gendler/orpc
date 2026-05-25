import { createPlanet, findPlanet, listPlanets, updatePlanet } from './planet'
import { sse } from './sse'

export const router = {
  planet: {
    list: listPlanets,
    create: createPlanet,
    find: findPlanet,
    update: updatePlanet,
  },

  sse,
}
