<script setup lang="ts">
import { useInfiniteQuery } from '@tanstack/vue-query'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

useSeoMeta({
  title: 'Dashboard',
})

const { $orpc } = useNuxtApp()

const query = useInfiniteQuery($orpc.planet.list.infiniteOptions({
  input: cursor => ({ cursor, limit: 10 }),
  getNextPageParam: lastPage => lastPage.length === 10 ? lastPage.at(-1)?.id : null,
  initialPageParam: 0,
}))

await query.suspense()

const planets = computed(() => query.data.value?.pages.flatMap(page => page) ?? [])
const withImages = computed(() => planets.value.filter(planet => planet.imageUrl).length)
</script>

<template>
  <UDashboardPanel id="overview">
    <template #header>
      <UDashboardNavbar title="Overview">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UButton
            label="API reference"
            icon="i-lucide-book-open"
            color="neutral"
            variant="outline"
            to="/api"
            target="_blank"
          />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <UPageGrid>
        <UPageCard
          title="Planets"
          :description="`${planets.length} records loaded from oRPC.`"
          icon="i-lucide-orbit"
          to="/dashboard/planets"
        />
        <UPageCard
          title="Images"
          :description="`${withImages} planets currently include an image URL.`"
          icon="i-lucide-image"
          to="/dashboard/planets"
        />
        <UPageCard
          title="Stream"
          description="Inspect the existing streamed event iterator."
          icon="i-lucide-radio"
          to="/dashboard/stream"
        />
      </UPageGrid>

      <UPageCard title="Recent planets" variant="subtle">
        <div class="divide-y divide-default">
          <div
            v-for="planet in planets.slice(0, 5)"
            :key="planet.id"
            class="flex items-center justify-between gap-4 py-3"
          >
            <div class="min-w-0">
              <p class="truncate font-medium text-highlighted">
                {{ planet.name }}
              </p>
              <p class="truncate text-sm text-muted">
                {{ planet.description || 'No description' }}
              </p>
            </div>
            <UBadge color="neutral" variant="subtle">
              #{{ planet.id }}
            </UBadge>
          </div>
        </div>
      </UPageCard>
    </template>
  </UDashboardPanel>
</template>
