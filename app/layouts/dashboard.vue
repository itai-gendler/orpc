<script setup lang="ts">
import type { DropdownMenuItem, NavigationMenuItem } from '@nuxt/ui'
import { authClient } from '~/utils/auth-client'

const route = useRoute()
const open = ref(false)
const session = await authClient.useSession(useFetch)

const user = computed(() => session.data.value?.user)

const links = [[{
  label: 'Overview',
  icon: 'i-lucide-house',
  to: '/dashboard',
  exact: true,
  onSelect: () => {
    open.value = false
  },
}, {
  label: 'Planets',
  icon: 'i-lucide-orbit',
  to: '/dashboard/planets',
  onSelect: () => {
    open.value = false
  },
}, {
  label: 'Market trends',
  icon: 'i-lucide-trending-up',
  to: '/dashboard/market-trends',
  onSelect: () => {
    open.value = false
  },
}, {
  label: 'Stream',
  icon: 'i-lucide-radio',
  to: '/dashboard/stream',
  onSelect: () => {
    open.value = false
  },
}], [{
  label: 'API reference',
  icon: 'i-lucide-book-open',
  to: '/api',
  target: '_blank',
}]] satisfies NavigationMenuItem[][]

const groups = computed(() => [{
  id: 'navigation',
  label: 'Navigation',
  items: links.flat(),
}, {
  id: 'resources',
  label: 'Resources',
  items: [{
    label: 'Scalar API Reference',
    icon: 'i-lucide-book-open',
    to: '/api',
    target: '_blank',
  }],
}])

const userMenuItems = computed<DropdownMenuItem[][]>(() => [[{
  type: 'label',
  label: user.value?.name ?? 'Account',
  avatar: {
    src: user.value?.image ?? undefined,
    alt: user.value?.name ?? 'Account',
  },
}], [{
  label: 'Dashboard',
  icon: 'i-lucide-layout-dashboard',
  to: '/dashboard',
}, {
  label: 'API reference',
  icon: 'i-lucide-book-open',
  to: '/api',
  target: '_blank',
}], [{
  label: 'Log out',
  icon: 'i-lucide-log-out',
  onSelect: async () => {
    await authClient.signOut()
    await navigateTo('/login')
  },
}]])
</script>

<template>
  <UDashboardGroup unit="rem">
    <UDashboardSidebar
      id="platform"
      v-model:open="open"
      collapsible
      resizable
      class="bg-elevated/25"
      :ui="{ footer: 'lg:border-t lg:border-default' }"
    >
      <template #header="{ collapsed }">
        <NuxtLink
          to="/dashboard"
          class="flex min-w-0 items-center gap-2 px-2 py-1.5"
          :class="collapsed ? 'justify-center' : ''"
        >
          <div class="flex size-8 items-center justify-center rounded-md bg-primary text-inverted">
            <UIcon name="i-lucide-orbit" class="size-5" />
          </div>
          <span v-if="!collapsed" class="truncate text-sm font-semibold text-highlighted">Lunaria</span>
        </NuxtLink>
      </template>

      <template #default="{ collapsed }">
        <UDashboardSearchButton :collapsed="collapsed" class="bg-transparent ring-default" />

        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[0]"
          orientation="vertical"
          tooltip
          popover
        />

        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[1]"
          orientation="vertical"
          tooltip
          class="mt-auto"
        />
      </template>

      <template #footer="{ collapsed }">
        <UDropdownMenu
          :items="userMenuItems"
          :content="{ align: 'center', collisionPadding: 12 }"
          :ui="{ content: collapsed ? 'w-48' : 'w-(--reka-dropdown-menu-trigger-width)' }"
        >
          <UButton
            :label="collapsed ? undefined : user?.name"
            :avatar="{ src: user?.image ?? undefined, alt: user?.name ?? 'Account' }"
            :trailing-icon="collapsed ? undefined : 'i-lucide-chevrons-up-down'"
            color="neutral"
            variant="ghost"
            block
            :square="collapsed"
            class="data-[state=open]:bg-elevated"
            :ui="{ trailingIcon: 'text-dimmed' }"
          />
        </UDropdownMenu>
      </template>
    </UDashboardSidebar>

    <UDashboardSearch :groups="groups" />

    <slot />
  </UDashboardGroup>
</template>
